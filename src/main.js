import FiltersComponent from "./components/filters/filters.js";
import MenuComponent from "./components/menu/menu.js";
import SortComponent from "./components/sort/sort.js";
import TripDaysComponent from "./components/days/days.js";
import TripInfoComponent from "./components/info/info.js";
import NoEventsComponent from "./components/no-events/no-events.js";
import TripController from "./controllers/trip-controller";
import {getTripData} from "./mock/trip.js";
import {render} from "./utils/render.js";
import {RenderPosition} from "./consts.js";

const trips = getTripData();

const tripMain = document.querySelector(`.trip-main`);
const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const tripEvents = document.querySelector(`.trip-events`);
const noEvent = new NoEventsComponent();

if (trips.length === 0) {
  render(tripEvents, noEvent.getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  const tripDays = new TripDaysComponent();
  render(tripEvents, tripDays.getElement(), RenderPosition.BEFOREEND);

  const tripController = new TripController(tripDays);
  tripController.render(trips);
}

const tripInfo = new TripInfoComponent(trips);

render(tripMain, tripInfo.getElement(), RenderPosition.AFTERBEGIN);

render(mainMenuHeader, new MenuComponent().getElement(), RenderPosition.BEFOREBEGIN);
render(mainMenuElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);

