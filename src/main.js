import {createCostInfoTemplate} from "./components/cost-info.js";
import {createEditTemplate} from "./components/editing";
import {createFiltersTemplate} from "./components/filter";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sorting";
import {createTripDaysTemplate} from "./components/trip-days";
import {createTripEventsItemTemplate} from "./components/trip-events-item";
import {createTripEventsListTemplate} from "./components/trip-events-list";
import {createTripInfoTemplate} from "./components/trip-info";

const TRIP_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripMain, createTripInfoTemplate(), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);

render(tripInfo, createCostInfoTemplate());
render(mainMenuHeader, createMenuTemplate(), `beforebegin`);
render(mainMenuElement, createFiltersTemplate());
render(tripEvents, createSortTemplate());
render(tripEvents, createEditTemplate());
render(tripEvents, createTripDaysTemplate());

const tripDaysItem = tripEvents.querySelector(`.trip-days__item`);

render(tripDaysItem, createTripEventsListTemplate());

const tripEventsList = tripDaysItem.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_COUNT; i++) {
  render(tripEventsList, createTripEventsItemTemplate());
}
