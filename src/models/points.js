import {FilterType, SortType} from "@consts";

export default class Points {
  constructor() {
    this._trips = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTrips() {
    return this.filterBy(this.sortBy(SortType.DEFAULT));
  }

  setTrips(trips) {
    this._trips = Array.from(trips);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeTrip(trip) {
    const index = this._trips.findIndex((it) => {
      return it.id === trip.id;
    });

    if (index === -1) {
      return false;
    }

    this._trips = [].concat(this._trips.slice(0, index), this._trips.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    this._callHandlers(this._filterChangeHandlers);

    return true;
  }

  updateTrip(oldTrip, trip) {
    const index = this._trips.findIndex((it) => {
      return it.id === oldTrip.id;
    });

    if (index === -1) {
      return false;
    }

    this._trips = [].concat(this._trips.slice(0, index), trip, this._trips.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addTrip(trip) {
    this._trips = [].concat(trip, this._trips.filter((_trip) => {
      return _trip.id;
    }));
    this._callHandlers(this._dataChangeHandlers);
    this._callHandlers(this._filterChangeHandlers);
    return true;
  }

  filterBy(trips, filterType) {
    const _trips = trips || this._trips;
    const now = new Date();
    switch (filterType || this._activeFilterType) {
      case FilterType.FUTURE:
        return _trips.filter((trip) => {
          return trip.checkin > now;
        });

      case FilterType.PAST:
        return _trips.filter((trip) => {
          return trip.checkin < now;
        });

      default:
        return _trips;
    }
  }

  sortBy(sortType) {
    let sortedTrips = [];

    switch (sortType) {
      case SortType.TIME:
        sortedTrips = this._sortByDuration(this._trips);
        break;
      case SortType.PRICE:
        sortedTrips = this._sortByPrice(this._trips);
        break;
      case SortType.DEFAULT:
        sortedTrips = this._sortByCheckin(this._trips);
        break;
    }

    return sortedTrips;
  }

  calcTotalCost() {
    return this._trips.reduce((sum, trip) => {
      const offersCost = trip.offers.reduce((cost, offer) => {
        return cost + (offer.isChecked ? offer.price : 0);
      }, 0);
      return sum + trip.price + offersCost;
    }, 0);
  }

  getDestinations() {
    return this._sortByCheckin(this._trips).map((trip) => {
      return trip.destination;
    });
  }

  getTripDates() {
    return this._trips.reduce((scope, trip) => {
      if (trip.checkin < scope.min) {
        scope.min = trip.checkin;
      }
      if (trip.checkout > scope.max) {
        scope.max = trip.checkout;
      }
      return scope;
    }, {
      min: this._trips[0].checkin,
      max: this._trips[0].checkout
    });
  }

  _sortByCheckin(trips) {
    return trips.sort((a, b) => {
      return a.checkin - b.checkin;
    });
  }

  _sortByDuration(trips) {
    return trips.sort((a, b) => {
      return (b.checkout - b.checkin) - (a.checkout - a.checkin);
    });
  }

  _sortByPrice(trips) {
    return trips.sort((a, b) => b.price - a.price);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(() => {
      handler(this._activeFilterType);
    });
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
