import AbstractComponent from "@abstract";
import {createSortTemplate} from "./sort-tpl";
import {SortType} from "@consts";

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const sortItem = evt.target.closest(`.trip-sort__item`);

      if (!sortItem) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      const sortInput = sortItem.querySelector(`.trip-sort__input`);
      if (sortInput) {
        sortInput.checked = true;
      }

      handler(this._currenSortType);
    });
  }
}
