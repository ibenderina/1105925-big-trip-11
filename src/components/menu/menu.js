import AbstractComponent from "../abstract";
import {createMenuTemplate} from "./menu-tpl.js";

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }
}
