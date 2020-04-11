import {eventTypes} from "../mock/trip.js";
import {eventCities} from "../mock/trip.js";
import {activity} from "../mock/trip.js";
import {transfer} from "../mock/trip.js";
import {getFormattedDate} from "../utils.js";

const createEventType = (index, value, t) => {
  const lowerCase = value.toLowerCase();
  return `<div class="event__type-item">
      <input id="event-type-${lowerCase}-${index}"
             class="event__type-input  visually-hidden"
             type="radio"
             name="event-type"
             data-type="${t}"
             value="${lowerCase}">
      <label class="event__type-label  event__type-label--${lowerCase}" for="event-type-${lowerCase}-${index}">${value}</label>
    </div>`;
};
const createEventPhoto = (value) => {
  return `<img class="event__photo" src="${value}" alt="Event photo">`;
};
const createEventDestination = (value) => {
  return `<option value="${value}"></option>`;
};
const createOffer = (value, index, price) => {
  const lowerCaseTrim = value.toLowerCase().trim();
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${lowerCaseTrim}-${index}" type="checkbox" name="event-offer-${lowerCaseTrim}">
            <label class="event__offer-label" for="event-offer-${lowerCaseTrim}-${index}">
              <span class="event__offer-title">${value}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>`;
};
const createDescriptionTemplate = (text) => {
  return `<p class="event__destination-description">${text}</p>`;
};

const createEventTypeList = (trip, eventType) => {
  return eventTypes.map((item, index) => {
    if (item.type === eventType) {
      return createEventType(index, item.name, eventType);
    }
    return ``;
  }).join(``);
};

const createEventPhotosList = (photos) => {
  return photos.map((value) => {
    return createEventPhoto(value);
  }).join(``);
};

const createEventsDestinationList = () => {
  return eventCities.map((value) => {
    return createEventDestination(value);
  }).join(``);
};

const createOffers = (offers) => {
  return offers.map((offer, index) => {
    const {name, price} = offer;
    return createOffer(name, index, price);
  }).join(``);
};

const createDescription = (description) => {
  return createDescriptionTemplate(description.join(` `));
};

export const createEditTemplate = (trip) => {
  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            ${createEventTypeList(trip.targetType, transfer)}

          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${createEventTypeList(trip.targetType, activity)}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${trip.destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createEventsDestinationList()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormattedDate(`d/m/Y H:i`, trip.checkin)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedDate(`d/m/Y H:i`, trip.checkout)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${trip.price}" min="0">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffers(trip.offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${createDescription(trip.info.description)}
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createEventPhotosList(trip.info.photos)}
          </div>
        </div>
      </section>
    </section>
  </form>`;
};
