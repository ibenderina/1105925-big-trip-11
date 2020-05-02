import MenuComponent from "@components/menu/menu";
import TripDaysComponent from "@components/days/days";
import TripController from "@controllers/trip-controller";
import FilterController from "@controllers/filter-controller";
import StatsComponent from "@components/stats/stats";
import PointsModel from "@models/points";
import {getTripData} from "./mock/trip";
import {render} from "@utils/render";
import {RenderPosition} from "@consts";

const trips = getTripData();

const modelPoints = new PointsModel();
modelPoints.setTrips(trips);
const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const tripDays = new TripDaysComponent();

const tripController = new TripController(tripDays, modelPoints);
tripController.render();

render(mainMenuHeader, new MenuComponent().getElement(), RenderPosition.BEFOREBEGIN);
const filterController = new FilterController(mainMenuElement, modelPoints);
filterController.render();

render(mainMenuHeader, new StatsComponent().getElement(), RenderPosition.BEFOREBEGIN);

