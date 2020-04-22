import AbstractComponent from "../abstract";
import {createMenuTemplate} from "./menu-tpl";

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }
}
