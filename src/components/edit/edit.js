import AbstractSmartComponent from "@smart-abstract";
import {createEditTemplate} from "./edit-tpl";
import {editTripTime} from "@utils/common";
import "flatpickr/dist/flatpickr.min.css";
import moment from "moment";

export default class Edit extends AbstractSmartComponent {
  constructor(trip, availableDestinations) {
    super();
    this._trip = trip;
    this._availableDestinations = availableDestinations;
  }

  getTemplate() {
    return createEditTemplate(this._trip, this._availableDestinations);
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return {
      destination: formData.get(`event-destination`),
      checkin: new Date(moment(formData.get(`event-start-time`), `DD/MM/YYYY hh:mm`)),
      checkout: new Date(moment(formData.get(`event-end-time`), `DD/MM/YYYY hh:mm`)),
      price: parseInt(formData.get(`event-price`), 10)
    };
  }

  getElement() {
    if (this._element) {
      return this._element;
    }
    super.getElement();
    const dateEndElement = this._element.querySelector(`#event-end-time-1`);
    const dateStartElement = this._element.querySelector(`#event-start-time-1`);

    editTripTime(dateStartElement, `today`, (selectedDates, dateStr) => {
      editTripTime(dateEndElement, dateStr);
    });

    editTripTime(dateEndElement, this._trip.checkin);
    return this._element;
  }

  setChangeEventTypeHandler(handler) {
    this.getElement()
        .querySelectorAll(`.event__type-input`)
        .forEach((item) => {
          item.addEventListener(`change`, handler);
        });
  }

  setChangeDestinationHandler(handler) {
    this.getElement()
        .querySelector(`.event__input--destination`)
        .addEventListener(`focusout`, handler);
  }

  setToggleKeydownEnterHandler(handler) {
    this.getElement()
        .querySelector(`.event__type-wrapper`)
        .addEventListener(`keydown`, handler);
  }

  setClickButtonHandler(handler) {
    this.getElement()
        .querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, handler);
  }

  setSubmitHandler(handler) {
    this.getElement()
        .addEventListener(`submit`, handler);
  }

  setClickFavoriteButtonHandler(handler) {
    this.getElement()
        .querySelector(`.event__favorite-btn`)
        .addEventListener(`click`, handler);
  }

  setInputHandler(handler) {
    this.getElement()
        .querySelector(`.event__input--destination`)
        .addEventListener(`keydown`, handler);
  }

  setPriceInputHandler(handler) {
    this.getElement()
        .querySelector(`.event__input--price`)
        .addEventListener(`input`, handler);
  }

  setClickCancelButtonHandler(handler) {
    this.getElement()
        .querySelector(`.event__reset-btn`)
        .addEventListener(`click`, handler);
  }

  setCheckOfferHandler(handler) {
    this.getElement()
        .querySelectorAll(`.event__offer-checkbox`).forEach((inputElement) => {
          inputElement.addEventListener(`change`, handler);
        });
  }
}
