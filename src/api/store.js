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

  setItems(key, items) {
    this._storage.setItem(`${this._storeKey}-${key}`, JSON.stringify(items));
  }

  setItem(key, point) {
    let store = this.getItems(key);
    if (point.id) {
      store = store.map((storedPoint) => {
        return storedPoint.id === point.id ? point : storedPoint;
      });
    } else {
      store.push(point);
    }
    this._storage.setItem(`${this._storeKey}-${key}`, JSON.stringify(store));
  }

  removePoint(point) {
    const removedStore = this.getItems(`removed-points`);
    removedStore.push(point.id);
    this._storage.setItem(`${this._storeKey}-removed-points`, JSON.stringify(removedStore));

    const store = this.getItems(`points`).filter((_point) => {
      return _point.id !== point.id;
    });
    this._storage.setItem(`${this._storeKey}-points`, JSON.stringify(store));
  }
}
