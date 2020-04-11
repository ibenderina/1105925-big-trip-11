import {createCostInfoTemplate} from "./components/cost-info.js";
import {createEditTemplate} from "./components/editing.js";
import {createFiltersTemplate} from "./components/filter.js";
import {createMenuTemplate} from "./components/menu.js";
import {createSortTemplate} from "./components/sorting.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {getTripData} from "./mock/trip.js";
import {render} from "./utils.js";
import {capitalize} from "./utils.js";
import flatpickr from "flatpickr";

const trips = getTripData();

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
render(tripEvents, createEditTemplate(trips[0]));
render(tripEvents, createTripDaysTemplate(trips.slice(1)));

const eventTypeOutput = document.querySelector(`.event__type-output`);
const eventTypeButton = document.querySelectorAll(`.event__type-input`);
const eventTypeIcon = document.querySelector(`.event__type-icon`);

eventTypeButton.forEach(function (element) {
  element.addEventListener(`change`, function (evt) {
    const input = evt.target;
    eventTypeOutput.textContent = capitalize(input.value) + ` ` + input.dataset[`type`];
    eventTypeIcon.src = `img/icons/${input.value}.png`;
  });
});

flatpickr(`.event__input--time`, {
  enableTime: true,
  minDate: `today`,
  dateFormat: `d/m/Y H:i`,
});
