import DayComponent from "@components/day/day";
import EventsComponent from "@components/events/events";
import EventsItemComponent from "@components/events-item/events-item";
import SortComponent from "@components/sort/sort";
import {formatDate, getUniqueTripDates} from "@utils/common";
import {render} from "@utils/render";
import {RenderPosition, SortType} from "@consts";
import NoEventsComponent from "@components/no-events/no-events";
import PointController from "./point-controller";

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._tripEvents = document.querySelector(`.trip-events`);
    this._noEvent = new NoEventsComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showedEventComponents = [];
    this._modelPoints = pointsModel;
  }

  render() {
    const trips = this._modelPoints.getTrips();
    if (!trips.length) {
      render(this._tripEvents, this._noEvent.getElement(), RenderPosition.BEFOREEND);
    } else {
      render(this._tripEvents, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
      render(this._tripEvents, this._container.getElement(), RenderPosition.BEFOREEND);
    }

    this._renderTripDays(this._container.getElement(), trips);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      if (sortType) {
        const sortedTrips = this._getSortedTrips(trips, sortType, 0);
        this._container.getElement().innerHTML = ``;
        if (sortType === SortType.DEFAULT) {
          return this._renderTripDays(this._container.getElement(), sortedTrips);
        }
        return this._renderSortedTripDays(this._container.getElement(), sortedTrips);
      }
      return null;
    });
  }

  _onDataChange(pointController, oldData, newData) {
    console.log(444);
    const isSuccess = this._modelPoints.updateTrip(oldData, newData);
    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _sortByCheckin(trips) {
    return trips.sort((a, b) => {
      return a.checkin - b.checkin;
    });
  }

  _sortByDuration(trips) {
    return trips.sort((a, b) => {
      return (b.checkout - b.checkin) - (a.checkout - a.checkin);
    });
  }

  _sortByPrice(trips) {
    return trips.sort((a, b) => b.price - a.price);
  }

  _renderTripDays(tripDaysElement, trips) {
    trips = this._sortByCheckin(trips);
    const dates = getUniqueTripDates(trips);
    return dates.map((date, i) => {
      const sortedTrips = trips.filter((trip) => {
        return formatDate(trip.checkin, `Y-m-d`) === date;
      });
      tripDaysElement.appendChild(this._renderTripDay(sortedTrips, i));
    });
  }

  _renderSortedTripDays(tripDaysElement, trips) {
    tripDaysElement.appendChild(this._renderTripDay(trips, null));
  }

  _renderTripDay(trips, dayNumber) {
    const dayComponent = new DayComponent(trips[0].checkin, dayNumber).getElement();
    dayComponent.appendChild(this._renderEventsComponent(trips));
    return dayComponent;
  }

  _renderEventsComponent(trips) {
    const eventsElement = new EventsComponent(trips).getElement();
    trips.forEach((trip) => {
      const eventList = new EventsItemComponent().getElement();
      const pointController = new PointController(eventList, this._onDataChange, this._onViewChange);
      pointController.render(trip);
      eventsElement.appendChild(eventList);
      this._showedEventComponents.push(pointController);
    });
    return eventsElement;
  }

  _getSortedTrips(trips, sortType) {
    let sortedTrips = [];

    switch (sortType) {
      case SortType.TIME:
        sortedTrips = this._sortByDuration(trips);
        break;
      case SortType.PRICE:
        sortedTrips = this._sortByPrice(trips);
        break;
      case SortType.DEFAULT:
        sortedTrips = this._sortByCheckin(trips);
        break;
    }

    return sortedTrips;
  }

  _onViewChange() {
    this._showedEventComponents.forEach((it) => it.setDefaultView());
  }
}
