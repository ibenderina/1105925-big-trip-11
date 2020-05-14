import PointModel from "@models/point";
import OfferModel from "@models/offer";
import DestinationModel from "@models/destination";
import {LOCAL_STORE_KEYS} from "@consts";

export class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations().then((items) => {
        const storeData = items.map((item) => {
          return item.toRAW();
        });
        this._store.setItems(LOCAL_STORE_KEYS.DESTINATIONS, storeData);
        return items;
      });
    }
    const destinations = Object.values(this._store.getItems(LOCAL_STORE_KEYS.DESTINATIONS));
    return Promise.resolve(DestinationModel.parse(destinations));
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers().then((items) => {
        const rawOffers = Object.entries(items).map((item) => {
          return {"type": item[0], "offers": item[1].map((offer) => {
            return offer.toRAW();
          })};
        });
        this._store.setItems(LOCAL_STORE_KEYS.OFFERS, rawOffers);
        return items;
      });
    }
    const offers = Object.values(this._store.getItems(LOCAL_STORE_KEYS.OFFERS));
    return Promise.resolve(OfferModel.parse(offers));
  }

  getPoints(offers) {
    if (this._isOnline()) {
      return this._api.getPoints(offers).then((items) => {
        const storeData = items.map((item) => {
          return item.toRAW();
        });
        this._store.setItems(LOCAL_STORE_KEYS.POINTS, storeData);
        return items;
      });
    }
    const points = Object.values(this._store.getItems(LOCAL_STORE_KEYS.POINTS));
    return Promise.resolve(PointModel.parse(points, offers));
  }

  updatePoint(point, offers) {
    if (this._isOnline()) {
      return this._api.updatePoint(point, offers).then((_point) => {
        this._store.setPoint(_point.toRAW());
        return _point;
      });
    }
    this._store.setPoint(point.toRAW());
    return Promise.resolve(point);
  }

  createPoint(point, offers) {
    if (this._isOnline()) {
      return this._api.createPoint(point, offers).then((_point) => {
        this._store.setPoint(_point.toRAW());
        return _point;
      });
    }
    point.id = Math.random().toString();
    this._store.setPoint(point.toRAW());
    return Promise.resolve(point);
  }

  deletePoint(point) {
    if (this._isOnline()) {
      return this._api.deletePoint(point).then(() => {
        this._store.removePoint(point);
      });
    }
    this._store.removePoint(point);
    return Promise.resolve();
  }

  sync() {
    if (this._isOnline()) {
      const storePoints = this._store.getItems(LOCAL_STORE_KEYS.POINTS);
      return this._api.sync(storePoints).then((response) => {
        const points = [...response.created, ...response.updated];
        this._store.setItems(points);
      });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
