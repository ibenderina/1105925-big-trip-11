import DayComponent from "@components/day/day";
import EventsComponent from "@components/events/events";
import EventsItemComponent from "@components/events-item/events-item";
import SortComponent from "@components/sort/sort";
import TripInfoComponent from "@components/info/info";
import CostComponent from "@components/cost/cost";
import NoEventsComponent from "@components/no-events/no-events";
import PointController from "./point-controller";
import {formatDate, getUniqueTripDates} from "@utils/common";
import {render} from "@utils/render";
import {createTripDataElement} from "../mock/trip";
import {FilterType, RenderPosition, SortType} from "@consts";

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._modelPoints = pointsModel;

    this._showedEventComponents = [];

    this._sortComponent = new SortComponent();
    this._tripEvents = document.querySelector(`.trip-events`);
    this._tripMain = document.querySelector(`.trip-main`);
    this._newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
    this._noEvent = new NoEventsComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._changeSortType = this._changeSortType.bind(this);
    this._updateTrips = this._updateTrips.bind(this);
    this._onCloseNewEvent = this._onCloseNewEvent.bind(this);

    this._modelPoints.setFilterChangeHandler(this._updateTrips);

    this._addNewEventHandler();
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const trips = this._modelPoints.getTrips();
    if (!trips.length) {
      render(this._tripEvents, this._noEvent.getElement(), RenderPosition.BEFOREEND);
    } else {
      this._renderTripInfo();
      render(this._tripEvents, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
      render(this._tripEvents, this._container.getElement(), RenderPosition.BEFOREEND);
    }

    this._renderTripDays(this._container.getElement(), trips);

    this._sortComponent.setSortTypeChangeHandler(this._changeSortType);
    this._modelPoints.setFilterChangeHandler(this._sortComponent.resetSortType);
    this._newEventBtn.disabled = false;
  }

  _onDataChange(pointController, oldData, newData) {
    this._newEventBtn.disabled = false;
    const isSuccess = newData.id ? this._modelPoints.updateTrip(oldData.id, newData) : this._modelPoints.addTrip(newData);
    if (isSuccess) {
      if (pointController) {
        return pointController.render(newData);
      }
      this._updateTrips();
    }
    return null;
  }

  _renderTripDays(tripDaysElement, trips) {
    const dates = getUniqueTripDates(trips);
    return dates.map((date, i) => {
      const sortedTrips = trips.filter((trip) => {
        return formatDate(trip.checkin, `Y-m-d`) === date;
      });
      tripDaysElement.appendChild(this._renderTripDay(sortedTrips, i));
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
    const dayElement = dayComponent.getElement();
    dayElement.appendChild(this._renderEventsComponent(trips, () => {
      this._onCloseNewEvent(dayComponent);
    }));
    return dayElement;
  }

  _renderEventsComponent(trips, closeNewEventHandler) {
    const eventsElement = new EventsComponent(trips).getElement();
    trips.forEach((trip) => {
      const eventList = new EventsItemComponent().getElement();
      const pointController = new PointController(eventList, this._onDataChange, this._onViewChange, closeNewEventHandler);
      pointController.render(trip);
      eventsElement.appendChild(eventList);
      this._showedEventComponents.push(pointController);
    });
    return eventsElement;
  }

  _onCloseNewEvent(dayComponent) {
    dayComponent.removeElement();
    this._newEventBtn.disabled = false;
    this._showedEventComponents.pop();
  }

  _onViewChange() {
    this._showedEventComponents.forEach((it) => it.setDefaultView());
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
      this._updateTrips();
      this._newEventBtn.disabled = true;
      this._onViewChange();
      const newTrip = createTripDataElement();
      newTrip.id = null;
      const day = this._renderTripDay([newTrip], ``);
      render(this._container.getElement(), day, RenderPosition.AFTERBEGIN);
    });
  }
}
