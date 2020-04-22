import FiltersComponent from "./components/filters/filters";
import MenuComponent from "./components/menu/menu";
import TripDaysComponent from "./components/days/days";
import TripInfoComponent from "./components/info/info";
import TripController from "./controllers/trip-controller";
import {getTripData} from "./mock/trip";
import {render} from "./utils/render";
import {RenderPosition} from "./consts";

const trips = getTripData();

const tripMain = document.querySelector(`.trip-main`);
const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const tripDays = new TripDaysComponent();

const tripController = new TripController(tripDays);
tripController.render(trips);

const tripInfo = new TripInfoComponent(trips);

render(tripMain, tripInfo.getElement(), RenderPosition.AFTERBEGIN);

render(mainMenuHeader, new MenuComponent().getElement(), RenderPosition.BEFOREBEGIN);
render(mainMenuElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);

