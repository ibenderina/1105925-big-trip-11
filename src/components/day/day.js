import AbstractComponent from "@abstract";
import {createTripDayTemplate} from "./day-tpl";

export default class Day extends AbstractComponent {
  constructor(checkin, index) {
    super();
    this._checkin = checkin;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._checkin, this._index);
  }
}
