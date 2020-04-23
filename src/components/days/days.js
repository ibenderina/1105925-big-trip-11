import AbstractComponent from "../abstract";
import {createTripDaysTemplate} from "./days-tpl";

export default class Days extends AbstractComponent {
  getTemplate() {
    return createTripDaysTemplate();
  }
}
