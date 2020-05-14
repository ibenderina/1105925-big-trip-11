import AbstractComponent from "@abstract";
import {FilterType} from "@consts";
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

  setTabsState(futureIsEnable, pastIsEnable) {
    const element = this.getElement();
    [[FilterType.FUTURE, futureIsEnable], [FilterType.PAST, pastIsEnable]].forEach(([filterType, isEnable]) => {
      element.querySelector(`.trip-filters__filter-input[value="${filterType}"]`).disabled = !isEnable;
    });
  }
}
