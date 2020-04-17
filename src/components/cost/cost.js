import {createElement} from "../../utils";
import {createCostTemplate} from "./cost-tpl.js";

export default class Cost {
  constructor(cost) {
    this._cost = cost;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._cost);
  }

  getElement() {
    this._element = createElement(this.getTemplate());

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
