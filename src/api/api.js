import {Method} from "@consts";

export class Api {
  constructor(baseURL, authToken) {
    this._baseURL = baseURL;
    this._headers = {
      "Authorization": authToken,
      "Content-Type": `application/json`
    };
  }

  updatePoint(point) {
    return fetch(`${this._baseURL}/points/${point.id}`, {
      method: Method.PUT,
      body: JSON.stringify(point.toRAW()),
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`error`);
    });
  }

  createPoint(point) {
    return fetch(`${this._baseURL}/points`, {
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`error`);
    });
  }

  getDestinations() {
    return this._load(`destinations`);
  }

  getOffers() {
    return this._load(`offers`);
  }

  getPoints() {
    return this._load(`points`);
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
}
