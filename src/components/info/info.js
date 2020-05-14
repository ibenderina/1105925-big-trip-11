import AbstractComponent from "@abstract";
import {createTripInfoTemplate} from "./info-tpl";
import {DataCount} from "@consts";

export default class Info extends AbstractComponent {
  constructor(destinations, datesOfTrip) {
    super();
    this._destinations = destinations;
    this._datesOfTrip = datesOfTrip;
  }

  getTemplate() {
    let destinations = this._destinations;
    if (this._destinations.length > DataCount.MAX_SHOWN_DESTINATIONS) {
      destinations = [this._destinations[0], `...`, this._destinations[this._destinations.length - 1]];
    }
    return createTripInfoTemplate(destinations.join(` — `), this._datesOfTrip);
  }
}
