import DayComponent from "../components/day/day";
import EventsComponent from "../components/events/events";
import EventComponent from "../components/event/event";
import EventsItemComponent from "../components/events-item/events-item";
import EditComponent from "../components/edit/edit";
import SortComponent from "../components/sort/sort";
import {getFormattedDate, getUniqueTripDates, capitalize} from "../utils/common";
import {render, replace} from "../utils/render";
import {isEnterPressed, isEscPressed, RenderPosition, SortType} from "../consts";
import NoEventsComponent from "../components/no-events/no-events";

const renderTripDays = (tripDaysElement, trips) => {
  trips = trips.sort((a, b) => {
    return a.checkin - b.checkin;
  });
  const dates = getUniqueTripDates(trips);
  return dates.map((date, i) => {
    const sortedTrips = trips.filter((trip) => {
      return getFormattedDate(trip.checkin, `Y-m-d`) === date;
    });
    tripDaysElement.appendChild(renderTripDay(sortedTrips, i));
  });
};

const renderSortedTripDays = (tripDaysElement, trips) => {
  tripDaysElement.appendChild(renderTripDay(trips, null));
};

const renderTripDay = (trips, dayNumber) => {
  const dayComponent = new DayComponent(trips[0].checkin, dayNumber).getElement();
  dayComponent.appendChild(renderEventsComponent(trips));
  return dayComponent;
};

const renderEvent = (trip) => {

  const onEscKeydown = (evt) => {
    if (isEscPressed(evt.key)) {
      document.removeEventListener(`keydown`, onEscKeydown);
      replaceTripToEvent();
    }
  };

  const replaceTripToEdit = () => {
    replace(edit, event);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const replaceTripToEvent = () => {
    replace(event, edit);
  };

  const onToggleKeydownEnter = (evt) => {
    if (isEnterPressed(evt.key)) {
      evt.stopPropagation();
      const eventTypeToggle = evt.target.querySelector(`.event__type-toggle`);
      eventTypeToggle.checked = !eventTypeToggle.checked;
    }
  };

  const eventTypeChanger = (evt) => {
    const input = evt.target;
    const eventType = capitalize(input.value);
    const vector = input.dataset[`type`];
    eventTypeOutput.textContent = `${eventType} ${vector}`;
    eventTypeIcon.src = `img/icons/${input.value}.png`;
  };

  const eventList = new EventsItemComponent().getElement();
  const event = new EventComponent(trip);
  const edit = new EditComponent(trip);

  event.setClickButtonHandler(replaceTripToEdit);
  edit.setClickButtonHandler(replaceTripToEvent);

  edit.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceTripToEvent();
    document.removeEventListener(`keydown`, onEscKeydown);
  });

  edit.setToggleKeydownEnterHandler(onToggleKeydownEnter);
  edit.setChangeEventTypeHandler(eventTypeChanger);

  const eventTypeOutput = edit.getElement().querySelector(`.event__type-output`);
  const eventTypeIcon = edit.getElement().querySelector(`.event__type-icon`);

  eventList.appendChild(event.getElement());

  return eventList;
};

const renderEventsComponent = (trips) => {
  const eventsElement = new EventsComponent(trips).getElement();
  trips.forEach((trip) => {
    eventsElement.appendChild(renderEvent(trip));
  });
  return eventsElement;
};

const getSortedTrips = (trips, sortType) => {
  let sortedTrips = [];

  switch (sortType) {
    case SortType.TIME:
      sortedTrips = trips.sort((a, b) => {
        return (b.checkout - b.checkin) - (a.checkout - a.checkin);
      });
      break;
    case SortType.PRICE:
      sortedTrips = trips.sort((a, b) => b.price - a.price);
      break;
    case SortType.DEFAULT:
      sortedTrips = trips;
      break;
  }

  return sortedTrips;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._tripEvents = document.querySelector(`.trip-events`);
    this._noEvent = new NoEventsComponent();
  }

  render(trips) {
    if (trips.length === 0) {
      render(this._tripEvents, this._noEvent.getElement(), RenderPosition.BEFOREEND);
    } else {
      render(this._tripEvents, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
      render(this._tripEvents, this._container.getElement(), RenderPosition.BEFOREEND);
    }

    renderTripDays(this._container.getElement(), trips);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedTrips = getSortedTrips(trips, sortType, 0);
      this._container.getElement().innerHTML = ``;

      if (sortType === SortType.DEFAULT) {
        return renderTripDays(this._container.getElement(), sortedTrips);
      }
      return renderSortedTripDays(this._container.getElement(), sortedTrips);
    });
  }
}
