import AbstractComponent from "../abstract";
import CostComponent from "../cost/cost";
import {render} from "../../utils/render";
import {calcTotalCost} from "../../utils/common";
import {createTripInfoTemplate} from "./info-tpl";
import {RenderPosition} from "../../consts";

export default class Info extends AbstractComponent {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trips.length);
  }

  getElement() {
    if (!this._element) {
      super.getElement();
      render(this._element, new CostComponent(calcTotalCost(this._trips)).getElement(), RenderPosition.BEFOREEND);
    }
    return this._element;
  }
}
