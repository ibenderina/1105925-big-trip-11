import AbstractComponent from "../abstract";
import {createCostTemplate} from "./cost-tpl";

export default class Cost extends AbstractComponent {
  constructor(cost) {
    super();
    this._cost = cost;
  }

  getTemplate() {
    return createCostTemplate(this._cost);
  }
}
