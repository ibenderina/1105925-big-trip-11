import {LOCAL_STORE_KEYS} from "@consts";

export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItem(key, id) {
    return this.getItems(key).find((item) => {
      return item.id === id;
    });
  }

  getItems(key) {
    try {
      return JSON.parse(this._storage.getItem(`${this._storeKey}-${key}`)) || [];
    } catch (err) {
      return [];
    }
  }

  setItems(key, points) {
    this._storage.setItem(`${this._storeKey}-${key}`, JSON.stringify(points));
  }

  setPoint(point) {
    const store = this.getItems(LOCAL_STORE_KEYS.POINTS).filter((storedPoint) => {
      return storedPoint.id !== point.id;
    });
    store.push(point);
    this._storage.setItem(`${this._storeKey}-${LOCAL_STORE_KEYS.POINTS}`, JSON.stringify(store));
  }

  removePoint(point) {
    const store = this.getItems(LOCAL_STORE_KEYS.POINTS).filter((_point) => {
      return _point.id !== point.id;
    });
    this._storage.setItem(`${this._storeKey}-${LOCAL_STORE_KEYS.POINTS}`, JSON.stringify(store));
  }
}
