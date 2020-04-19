import {getFormattedDate, getUniqueTripDates, capitalize} from "../utils/common";
import {replace} from "../utils/render";
import DayComponent from "../components/day/day";
import EventsComponent from "../components/events/events";
import EventComponent from "../components/event/event";
import EventsItemComponent from "../components/events-item/events-item";
import EditComponent from "../components/edit/edit";
import {Key} from "../consts";

const renderTripDays = (tripDaysElement, trips) => {
  const dates = getUniqueTripDates(trips);
  return dates.map((date, i) => {
    const sortedTrips = trips.filter((trip) => {
      return getFormattedDate(trip.checkin, `Y-m-d`) === date;
    });
    tripDaysElement.appendChild(renderTripDay(sortedTrips, i));
  });
};

const renderTripDay = (trips, dayNumber) => {
  const dayComponent = new DayComponent(trips, dayNumber).getElement();
  dayComponent.appendChild(renderEventsComponent(trips));
  return dayComponent;
};

const renderEvent = (trip) => {

  const onEscKeydown = (evt) => {
    if (evt.key === Key.ESC) {
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
    if (evt.key === Key.ENTER) {
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

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(trips) {
    renderTripDays(this._container.getElement(), trips);
  }
}
