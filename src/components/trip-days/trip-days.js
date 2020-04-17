import {createTripDaysTemplate} from "./trip-days-tpl.js";
import {createElement} from "../../utils.js";
import {getFormattedDate, tripDate} from "../../utils";
import TripDaysItem from "../trip-days-item/trip-days-item";

export default class TripDays {
  constructor(trips) {
    this._element = null;
    this._trips = trips;
    this.getElement();
  }

  getTemplate() {
    return createTripDaysTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      const dates = tripDate(this._trips);
      dates.forEach((date, i) => {
        const sortedTrips = this._trips.filter((trip) => {
          return getFormattedDate(trip.checkin, `Y-m-d`) === date;
        });
        this._element.appendChild(new TripDaysItem(sortedTrips, i).getElement());
      });
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
