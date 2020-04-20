import AbstractComponent from "../abstract";
import {createSortTemplate} from "./sort-tpl";

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
