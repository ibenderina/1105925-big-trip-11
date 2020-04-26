import DayComponent from "Components/day/day";
import EventsComponent from "Components/events/events";
import EventsItemComponent from "Components/events-item/events-item";
import SortComponent from "Components/sort/sort";
import {formatDate, getUniqueTripDates} from "Utils/common";
import {render} from "Utils/render";
import {RenderPosition, SortType} from "Consts";
import NoEventsComponent from "Components/no-events/no-events";
import PointController from "./point-controller";

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._tripEvents = document.querySelector(`.trip-events`);
    this._noEvent = new NoEventsComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showedEventComponents = [];
  }

  render(trips) {
    this._trips = trips;
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
    const index = this._trips.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._trips = [].concat(this._trips.slice(0, index), newData, this._trips.slice(index + 1));

    pointController.render(this._trips[index]);
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
