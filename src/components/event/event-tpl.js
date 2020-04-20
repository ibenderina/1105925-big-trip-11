import {getDuration, getTime} from "../../utils/common";

const createOfferBlock = (offer) => {
  return `<li class="event__offer">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>`;
};

const createEventTemplate = (trip) => {
  const offers = (trip.offers || []).map((value) => {
    return createOfferBlock(value);
  }).join(``);

  return `<div class="event">
            <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${trip.targetType.name} ${trip.targetType.type} ${trip.destination}</h3>

            <div class="event__schedule">
            <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTime(trip.checkin)}</time>
            &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${getTime(trip.checkout)}</time>
            </p>
            <p class="event__duration">${getDuration(trip)}</p>
            </div>

            <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${trip.price}</span>
            </p>

            <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">${offers}</ul>
            <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>

         </div>`;
};

export {createEventTemplate};
