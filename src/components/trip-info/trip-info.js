import {calcTotalCost, createElement, render} from "../../utils";
import {createTripInfoTemplate} from "./trip-info-tpl";
import CostComponent from "../cost/cost";
import {RenderPosition} from "../../consts";

export default class TripInfo {
  constructor(trips) {
    this._element = null;
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trips.length);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      render(this._element, new CostComponent(calcTotalCost(this._trips)).getElement(), RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
