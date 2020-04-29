import AbstractComponent from "@abstract";
import CostComponent from "../cost/cost";
import {render} from "@utils/render";
import {calcTotalCost} from "@utils/common";
import {createTripInfoTemplate} from "./info-tpl";
import {dataCount, RenderPosition} from "@consts";

export default class Info extends AbstractComponent {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    let destinations = [...new Set(this._trips.map((trip) => {
      return trip.destination;
    }))];

    let datesOfTrip = [...new Set(this._trips.map((trip) => {
      return trip.checkin;
    }))];

    datesOfTrip = [datesOfTrip[0], datesOfTrip[datesOfTrip.length - 1]];

    if (destinations.length > dataCount.MAX_SHOWN_DESTINATIONS) {
      destinations = [destinations[0], `...`, destinations[destinations.length - 1]];
    }
    return createTripInfoTemplate(this._trips.length, destinations.join(` — `), datesOfTrip);
  }

  getElement() {
    if (!this._element) {
      super.getElement();
      render(this._element, new CostComponent(calcTotalCost(this._trips)).getElement(), RenderPosition.BEFOREEND);
    }
    return this._element;
  }
}
