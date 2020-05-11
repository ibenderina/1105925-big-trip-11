import AbstractComponent from "@abstract";
import {createLoadTemplate} from "../load/load-tpl";

export default class Load extends AbstractComponent {
  getTemplate() {
    return createLoadTemplate();
  }
}
