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
      const activeTab = document.querySelectorAll(`.trip-tabs__btn--active`);
      activeTab.forEach((element) => {
        element.classList.remove(`trip-tabs__btn--active`);
      });
      evt.target.classList.add(`trip-tabs__btn--active`);
      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
