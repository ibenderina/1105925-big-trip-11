import MenuComponent from "@components/menu/menu";
import TripDaysComponent from "@components/days/days";
import TripController from "@controllers/trip-controller";
import FilterController from "@controllers/filter-controller";
import StatsComponent from "@components/stats/stats";
import PointsModel from "@models/points";
import {getTripData} from "./mock/trip";
import {render} from "@utils/render";
import {RenderPosition, MenuItem, FilterType} from "@consts";

const trips = getTripData();

const modelPoints = new PointsModel();
modelPoints.setTrips(trips);
const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);
const tripDays = new TripDaysComponent();

const tripController = new TripController(tripDays, modelPoints);
tripController.render();

const siteMenuComponent = new MenuComponent();
render(mainMenuHeader, siteMenuComponent.getElement(), RenderPosition.BEFOREBEGIN);
const filterController = new FilterController(mainMenuElement, modelPoints);
filterController.render();

const statisticsComponent = new StatsComponent(modelPoints);
render(pageBodyContainer, statisticsComponent.getElement(), RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  modelPoints.setFilter(FilterType.EVERYTHING);
  switch (menuItem) {
    case MenuItem.STATISTICS:
      tripController.hide();
      statisticsComponent.render();
      statisticsComponent.show();
      break;
    case MenuItem.TRIPS:
      statisticsComponent.hide();
      tripController.show();
      break;
  }
});
