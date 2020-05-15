import AbstractComponent from "@abstract";
import {createLoadTemplate} from "./load-tpl";

export default class Load extends AbstractComponent {
  getTemplate() {
    return createLoadTemplate();
  }
}
