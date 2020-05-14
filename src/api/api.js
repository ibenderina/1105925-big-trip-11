import PointModel from "@models/point";
import OfferModel from "@models/offer";
import DestinationModel from "@models/destination";
import {Method} from "@consts";

const Server = {
  ENDPOINT: `https://11.ecmascript.pages.academy/big-trip`,
  AUTH_TOKEN: `Basic kittens3`
};

export class Api {
  constructor() {
    this._baseURL = Server.ENDPOINT;
    this._headers = {
      "Authorization": Server.AUTH_TOKEN,
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
      return DestinationModel.parse(destinations);
    });
  }

  getOffers() {
    return this._load(`offers`).then((offers) => {
      return OfferModel.parse(offers);
    });
  }

  getPoints(offers) {
    return this._load(`points`).then((points) => {
      return PointModel.parse(points, offers);
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

  sync(points) {
    // у этого метода есть баг. Он принимает и записывает что угодно. На пример ["Привет"]
    return fetch(`${this._baseURL}/points/sync`, {
      method: Method.POST,
      body: JSON.stringify(points),
      headers: this._headers
    }).then((response) => response.json());
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
}
