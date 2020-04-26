import FiltersComponent from "Components/filters/filters";
import MenuComponent from "Components/menu/menu";
import TripDaysComponent from "Components/days/days";
import TripInfoComponent from "Components/info/info";
import TripController from "Controllers/trip-controller";
import {getTripData} from "./mock/trip";
import {render} from "Utils/render";
import {RenderPosition} from "Consts";

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

