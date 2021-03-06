import AbstractComponent from "@abstract";
import {createEventTemplate} from "./event-tpl";

export default class Event extends AbstractComponent {
  constructor(trip) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createEventTemplate(this._trip);
  }

  setClickRollupButtonHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
