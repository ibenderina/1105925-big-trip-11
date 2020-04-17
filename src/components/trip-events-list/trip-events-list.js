import {createTripEventsListTemplate} from "../trip-events-list/trip-events-list-tpl";
import {createElement} from "../../utils.js";
import TripEventsItem from "../trip-events/trip-events-item";

export default class TripEventsList {
  constructor(trips) {
    this._element = null;
    this._trips = trips;
  }

  getTemplate() {
    return createTripEventsListTemplate(this._trips);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._trips.forEach((trip) => {
        this._element.appendChild(new TripEventsItem(trip).getElement());
      });
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
