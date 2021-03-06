import {formatDate} from "@utils/common";
import {render} from "@utils/render";
import DayComponent from "@components/day/day";
import EventsComponent from "@components/events/events";
import EventsItemComponent from "@components/events-item/events-item";
import SortComponent from "@components/sort/sort";
import TripInfoComponent from "@components/info/info";
import CostComponent from "@components/cost/cost";
import NoEventsComponent from "@components/no-events/no-events";
import LoadComponent from "@components/load/load";
import PointController from "@controllers/point-controller";
import PointModel from "@models/point";
import {FilterType, HIDDEN_CLASS, RenderPosition, SortType} from "@consts";

export default class TripController {
  constructor(container, modelPoints, modelDestinations, modelOffers, api) {
    this._container = container;
    this._modelPoints = modelPoints;
    this._modelDestinations = modelDestinations;
    this._modelOffers = modelOffers;
    this._api = api;

    this._showedEventComponents = [];

    this._sortComponent = new SortComponent();
    this._tripEvents = document.querySelector(`.trip-events`);
    this._tripMain = document.querySelector(`.trip-main`);
    this._newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
    this._noEvent = new NoEventsComponent();
    this._load = new LoadComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._changeSortType = this._changeSortType.bind(this);
    this._updateTrips = this._updateTrips.bind(this);
    this._onCloseNewEvent = this._onCloseNewEvent.bind(this);
    this._updateModelPoints = this._updateModelPoints.bind(this);

    this._addNewEventHandler();
    this._sortComponent.setSortTypeChangeHandler(this._changeSortType);
    this._modelPoints.setFilterChangeHandler(() => {
      this._sortComponent.resetSortType();
      this._updateTrips();
      this._newEventBtn.disabled = false;
    });
    render(this._tripEvents, this._load.getElement(), RenderPosition.BEFOREEND);
  }

  hide() {
    this._tripEvents.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._tripEvents.classList.remove(HIDDEN_CLASS);
  }

  render() {
    this._load.hide();
    const trips = this._modelPoints.getTrips();
    const noEvents = this._noEvent.getElement();
    if (!trips.length) {
      render(this._tripEvents, noEvents, RenderPosition.BEFOREEND);
      this._noEvent.show();
    } else {
      this._noEvent.hide();
      this._renderTripInfo();
      render(this._tripEvents, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    }
    render(this._tripEvents, this._container.getElement(), RenderPosition.BEFOREEND);
    this._renderTripDays(this._container.getElement(), trips);
  }

  _updateModelPoints(pointController, oldData, newData) {
    if (!newData) {
      this._modelPoints.removeTrip(oldData);
      return this._updateTrips();
    }
    const isSuccess = newData.id ? this._modelPoints.updateTrip(oldData, newData) : this._modelPoints.addTrip(newData);
    if (isSuccess) {
      if (pointController) {
        return pointController.render(newData);
      }
      return this._updateTrips();
    }
    return null;
  }

  _onDataChange(pointController, oldData, newData, sendToServer) {
    const updateModelPoint = (point) => {
      return this._updateModelPoints(pointController, oldData, (point || newData));
    };
    if (sendToServer) {
      if (!newData) {
        return this._api.deletePoint(oldData).then(updateModelPoint);
      } else if (newData.id) {
        return this._api.updatePoint(newData, this._modelOffers).then(updateModelPoint);
      } else if (!newData.id) {
        return this._api.createPoint(newData, this._modelOffers).then(updateModelPoint);
      }
    }

    if (pointController) {
      return Promise.resolve(updateModelPoint());
    }

    return null;
  }

  _renderTripDays(tripDaysElement, trips) {
    const sortedTrips = {};
    let newTrip = null;
    trips.forEach((trip) => {
      if (trip.id) {
        const key = formatDate(trip.checkin, `d-m-Y`);
        sortedTrips[key] = sortedTrips[key] ? sortedTrips[key].concat(trip) : [trip];
        return;
      }
      newTrip = trip;
    });
    if (newTrip) {
      tripDaysElement.appendChild(this._renderTripDay([newTrip], ``));
    }
    return Object.keys(sortedTrips).forEach((key, i) => {
      tripDaysElement.appendChild(this._renderTripDay(sortedTrips[key], i));
    });
  }

  _renderTripInfo() {
    if (this._tripInfo) {
      this._costComponent.removeElement();
      this._tripInfo.removeElement();
    }
    this._tripInfo = new TripInfoComponent(this._modelPoints.getDestinations(), this._modelPoints.getTripDates());
    this._costComponent = new CostComponent(this._modelPoints.calcTotalCost());
    render(this._tripInfo.getElement(), this._costComponent.getElement(), RenderPosition.BEFOREEND);
    render(this._tripMain, this._tripInfo.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderSortedTripDays(tripDaysElement, trips) {
    tripDaysElement.appendChild(this._renderTripDay(trips, null));
  }

  _renderTripDay(trips, dayNumber) {
    const dayComponent = new DayComponent(trips[0].checkin, dayNumber);
    const day = dayComponent.getElement();
    day.appendChild(this._renderEventsComponent(trips, () => {
      this._onCloseNewEvent(dayComponent);
    }));
    return day;
  }

  _renderEventsComponent(trips, closeNewEventHandler) {
    const events = new EventsComponent(trips).getElement();
    trips.forEach((trip) => {
      const eventList = new EventsItemComponent().getElement();
      const pointController = new PointController(
          eventList, this._modelDestinations, this._modelOffers, this._onDataChange, this._onViewChange, closeNewEventHandler
      );
      pointController.render(trip);
      events.appendChild(eventList);
      this._showedEventComponents.push(pointController);
    });
    return events;
  }

  _onCloseNewEvent(dayComponent) {
    dayComponent.removeElement();
    this._newEventBtn.disabled = false;
  }

  _onViewChange() {
    this._showedEventComponents.forEach((item) => {
      item.setDefaultView();
    });
  }

  _updateTrips() {
    this._showedEventComponents.forEach((controller) => {
      controller.destroy();
    });
    this._showedEventComponents = [];
    this._container.getElement().innerHTML = ``;
    this.render();
  }

  _changeSortType(sortType) {
    if (sortType) {
      this._newEventBtn.disabled = false;
      const sortedTrips = this._modelPoints.filterBy(this._modelPoints.sortBy(sortType));
      this._container.getElement().innerHTML = ``;
      if (sortType === SortType.DEFAULT) {
        return this._renderTripDays(this._container.getElement(), sortedTrips);
      }
      return this._renderSortedTripDays(this._container.getElement(), sortedTrips);
    }
    return null;
  }

  _addNewEventHandler() {
    this._newEventBtn.addEventListener(`click`, () => {
      this._sortComponent.resetSortType();
      this._modelPoints.setFilter(FilterType.EVERYTHING);
      this._newEventBtn.disabled = true;
      this._onViewChange();
      const newTrip = new PointModel(null, this._modelOffers.findOffers(`taxi`));
      this._noEvent.hide();
      const day = this._renderTripDay([newTrip], ``);
      render(this._container.getElement(), day, RenderPosition.AFTERBEGIN);
    });
  }
}
