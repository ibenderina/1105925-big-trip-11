import AbstractComponent from "../abstract";
import {createTripEventsListTemplate} from "./events-tpl";

export default class Events extends AbstractComponent {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripEventsListTemplate(this._trips);
  }
}
