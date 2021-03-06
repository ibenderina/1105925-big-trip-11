import {createSortTemplate} from "./sort-tpl";
import AbstractComponent from "@abstract";
import {SortType} from "@consts";

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this.resetSortType = this.resetSortType.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  resetSortType() {
    this._currenSortType = SortType.DEFAULT;
    this.getElement().querySelector(`#sort-event`).checked = true;
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
