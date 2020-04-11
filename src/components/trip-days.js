import {createTripEventsItemTemplate} from "./trip-events-item.js";
import {tripDate} from "../utils.js";

const createEvents = (events) => {
  return events.map((value) => {
    return createTripEventsItemTemplate(value);
  }).join(``);
};

export const createTripDayTemplate = (trips, i) => {
  const monthName = trips[0].checkin.toLocaleString(`default`, {month: `short`});
  return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="${trips[0].checkin.getFullYear()}-${trips[0].checkin.getMonth()}-${trips[0].checkin.getDate()}">
            ${monthName} ${trips[0].checkin.getDate()}
          </time>
        </div>
        <ul class="trip-events__list">
          ${createEvents(trips)}
        </ul>
      </li>`;
};

export const createTripDaysTemplate = (trips) => {
  const dates = tripDate(trips);
  const tripDay = dates.map((date, i) => {
    const sortedTrips = trips.filter((trip) => {
      return `${trip.checkin.getFullYear()}-${trip.checkin.getMonth()}-${trip.checkin.getDate()}` === date;
    });
    return createTripDayTemplate(sortedTrips, i);
  }).join(``);
  return `<ul class="trip-days">${tripDay}</ul>`;
};
