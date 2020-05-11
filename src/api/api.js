import PointModel from "@models/point";
import OfferModel from "@models/offer";
import DestinationModel from "@models/destination";
import {Method} from "@consts";

export class Api {
  constructor(baseURL, authToken) {
    this._baseURL = baseURL;
    this._headers = {
      "Authorization": authToken,
      "Content-Type": `application/json`
    };
  }

  updatePoint(point, offers) {
    return fetch(`${this._baseURL}/points/${point.id}`, {
      method: Method.PUT,
      body: JSON.stringify(point.toRAW()),
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`error`);
    }).then((_point) => {
      return new PointModel(_point, offers.findOffers(_point[`type`]));
    });
  }

  createPoint(point, offers) {
    return fetch(`${this._baseURL}/points`, {
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`error`);
    }).then((_point) => {
      return new PointModel(_point, offers.findOffers(_point[`type`]));
    });
  }

  getDestinations() {
    return this._load(`destinations`).then((destinations) => {
      return DestinationModel.parseMany(destinations);
    });
  }

  getOffers() {
    return this._load(`offers`).then((offers) => {
      return OfferModel.parseMany(offers);
    });
  }

  getPoints(offers) {
    return this._load(`points`).then((points) => {
      return PointModel.parseMany(points, offers);
    });
  }

  deletePoint(point) {
    return fetch(`${this._baseURL}/points/${point.id}`, {
      method: Method.DELETE,
      headers: this._headers
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`error`);
      }
    });
  }

  _load(target) {
    return fetch(`${this._baseURL}/${target}`, {
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`target not found`);
    });
  }

  sync(updatedPoints, removedPoints) {
    removedPoints.forEach((pointId) => {
      return this.deletePoint({id: pointId});
    });
    updatedPoints.forEach((point) => {
      return fetch(`${this._baseURL}/points/${point.id || ``}`, {
        method: point.id ? Method.PUT : Method.POST,
        body: JSON.stringify(point),
        headers: this._headers
      }).then((response) => response.json());
    });
    return Promise.resolve();
  }
}
