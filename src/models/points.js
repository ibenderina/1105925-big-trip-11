export default class Points {
  constructor() {
    this._trips = [];
    //this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTrips() {
    return this._trips;
  }

  setTrips(trips) {
    this._trips = Array.from(trips);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeTrip(id) {
    const index = this._trips.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._trips = [].concat(this._trips.slice(0, index), this._trips.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateTrip(id, trip) {
    const index = this._trips.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._trips = [].concat(this._trips.slice(0, index), trip, this._trips.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addTrip(trip) {
    this._trips = [].concat(trip, this._trips);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
