import CostComponent from "./components/cost/cost.js";
import FiltersComponent from "./components/filters/filters.js";
import MenuComponent from "./components/menu/menu.js";
import SortComponent from "./components/sort/sort.js";
import TripDaysComponent from "./components/trip-days/trip-days.js";
import TripInfoComponent from "./components/trip-info/trip-info.js";
import {getTripData} from "./mock/trip.js";
import {render, useFlatpickr} from "./utils.js";
import {RenderPosition} from "./consts.js";

const trips = getTripData();

const tripMain = document.querySelector(`.trip-main`);
const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripMain, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector(`.trip-info`);

render(tripInfo, new CostComponent().getElement(), RenderPosition.BEFOREEND);
render(mainMenuHeader, new MenuComponent().getElement(), RenderPosition.BEFOREBEGIN);
render(mainMenuElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new TripDaysComponent(trips).getElement(), RenderPosition.BEFOREEND);

useFlatpickr();
