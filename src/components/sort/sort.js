import AbstractComponent from "../abstract";
import {createSortTemplate} from "./sort-tpl";
import {SortType} from "../../consts";

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

      if (!evt.target.closest(`.trip-sort__btn`)) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
