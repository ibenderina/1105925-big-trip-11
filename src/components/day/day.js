import AbstractComponent from "../abstract";
import {createTripDayTemplate} from "./day-tpl";

export default class Day extends AbstractComponent {
  constructor(trips, index) {
    super();
    this._trips = trips;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._trips[0].checkin, this._index);
  }
}
