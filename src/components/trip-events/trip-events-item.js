import {createTripEventsItemTemplate} from "../trip-events/trip-events-item-tpl";
import {createElement} from "../../utils.js";
import TripEdit from "../editing/editing";
import TripEvent from "../event/event";

export default class TripEventsItem {
  constructor(trip) {
    this._element = null;
    this._trip = trip;
  }

  getTemplate() {
    return createTripEventsItemTemplate();
  }

  replaceTripToEdit() {
    this._element.replaceChild(this._eventEdit.getElement(), this._event.getElement());
  }

  replaceTripToEvent() {
    this._element.replaceChild(this._event.getElement(), this._eventEdit.getElement());
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._event = new TripEvent(this._trip, () => this.replaceTripToEdit());
      this._eventEdit = new TripEdit(this._trip, () => this.replaceTripToEvent());
      this._element.appendChild(this._event.getElement());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
