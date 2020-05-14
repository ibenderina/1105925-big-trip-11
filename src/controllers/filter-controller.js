import {render, replace} from "@utils/render";
import FiltersComponent from "@components/filters/filters";
import {FilterType, RenderPosition} from "@consts";

export default class FilterController {
  constructor(container, tripsModel) {
    this._container = container;
    this._tripsModel = tripsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    this._tripsModel.setDataChangeHandler(() => {
      this._filterComponent.setTabsState(
          this._tripsModel.filterBy(null, FilterType.FUTURE).length,
          this._tripsModel.filterBy(null, FilterType.PAST).length
      );
    });
    this._tripsModel.setFilterChangeHandler((filterType) => {
      this._filterComponent.setFilter(filterType);
    });

    if (oldComponent) {
      return replace(this._filterComponent, oldComponent);
    }
    return render(container, this._filterComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _onFilterChange(filterType) {
    this._tripsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
