import {createEventTemplate} from "../event/event-tpl";
import {createElement} from "../../utils";

export default class TripEvent {
  constructor(trip, replaceToEdit) {
    this._trip = trip;
    this._element = null;
    this._replaceToEdit = replaceToEdit;
  }

  getTemplate() {
    return createEventTemplate(this._trip);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, this._replaceToEdit);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
