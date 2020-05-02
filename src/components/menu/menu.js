import AbstractComponent from "@abstract";
import {createMenuTemplate} from "./menu-tpl";

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`trip-tabs__btn`)) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
