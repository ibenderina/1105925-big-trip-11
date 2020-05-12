import {render} from "@utils/render";
import {Api} from "@api/api";
import {Provider} from "@api/provider";
import StatsComponent from "@components/stats/stats";
import TripDaysComponent from "@components/days/days";
import MenuComponent from "@components/menu/menu";
import DestinationsModel from "@models/destinations";
import OffersModel from "@models/offers";
import PointsModel from "@models/points";
import FilterController from "@controllers/filter-controller";
import TripController from "@controllers/trip-controller";
import {RenderPosition, MenuItem, FilterType} from "@consts";
import Store from "@api/store";

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v2`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const store = new Store(STORE_NAME, window.localStorage);
const htmlAcademyDataApi = new Api();
const adapteredApi = new Provider(htmlAcademyDataApi, store);
const modelPoints = new PointsModel();
const modelDestinations = new DestinationsModel();
const modelOffers = new OffersModel();

const mainMenuElement = document.querySelector(`.trip-controls`);
const mainMenuHeader = mainMenuElement.querySelector(`.trip-controls__header`);
const pageBodyContainer = document.querySelector(`.page-main .page-body__container`);

const tripDays = new TripDaysComponent();

const tripController = new TripController(tripDays, modelPoints, modelDestinations, modelOffers, adapteredApi);
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

adapteredApi.getDestinations().then((destinations) => {
  modelDestinations.setDestinations(destinations);
  return adapteredApi.getOffers();
}).then((offers) => {
  modelOffers.setOffers(offers);
  return adapteredApi.getPoints(modelOffers);
}).then((points) => {
  modelPoints.setTrips(points);
  tripController.render();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  adapteredApi.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
