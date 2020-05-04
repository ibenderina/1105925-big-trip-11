import AbstractComponent from "@abstract";
import {createFiltersTemplate} from "./filters-tpl";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      handler(evt.target.value);
    });
  }

  setFilter(filterType) {
    this.getElement().querySelector(`.trip-filters__filter-input[value="${filterType}"]`).checked = true;
  }
}
