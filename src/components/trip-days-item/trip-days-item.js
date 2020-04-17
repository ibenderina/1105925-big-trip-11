import {createElement} from "../../utils";
import TripEventsList from "../trip-events-list/trip-events-list";
import {createTripDayTemplate} from "./trip-days-item-tpl";

export default class TripDaysItem {
  constructor(trips, index) {
    this._element = null;
    this._trips = trips;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._trips[0].checkin, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.appendChild(new TripEventsList(this._trips).getElement());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
