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
    this._disableForm = this._disableForm.bind(this);
  }

  getTemplate() {
    return createEditTemplate(this._trip, this._availableDestinations);
  }

  getData() {
    const form = this._element;
    return {
      destination: form.querySelector(`[name="event-destination"]`).value,
      checkin: new Date(moment(form.querySelector(`[name="event-start-time"]`).value, `DD/MM/YYYY hh:mm`)),
      checkout: new Date(moment(form.querySelector(`[name="event-end-time"]`).value, `DD/MM/YYYY hh:mm`)),
      price: parseInt(form.querySelector(`[name="event-price"]`).value, 10)
    };
  }

  removeElement() {
    this.startDateFlatpicker.destroy();
    this.endDateFlatpicker.destroy();

    super.removeElement();
  }

  getElement() {
    if (this._element) {
      return this._element;
    }
    super.getElement();
    const dateEndElement = this._element.querySelector(`#event-end-time-1`);
    const dateStartElement = this._element.querySelector(`#event-start-time-1`);

    this.startDateFlatpicker = editTripTime(dateStartElement, `today`, (selectedDates, dateStr) => {
      editTripTime(dateEndElement, dateStr);
    });

    this.endDateFlatpicker = editTripTime(dateEndElement, this._trip.checkin);
    this._element.addEventListener(`click`, () => {
      if (this._element) {
        this._element.classList.remove(`shake`);
      }
    });
    return this._element;
  }

  _disableForm(disabled) {
    this._element.querySelectorAll(`input, button`).forEach((el) => {
      el.disabled = disabled;
    });
  }

  setChangeEventTypeHandler(handler) {
    this._element
        .querySelectorAll(`.event__type-input`)
        .forEach((item) => {
          item.addEventListener(`change`, handler);
        });
  }

  setChangeDestinationHandler(handler) {
    this._element
        .querySelector(`.event__input--destination`)
        .addEventListener(`focusout`, handler);
  }

  setToggleKeydownEnterHandler(handler) {
    this._element
        .querySelector(`.event__type-wrapper`)
        .addEventListener(`keydown`, handler);
  }

  setClickRollupButtonHandler(handler) {
    const element = this.getElement().querySelector(`.event__rollup-btn`);
    if (element) {
      element.addEventListener(`click`, handler);
    }
  }

  setSubmitHandler(handler) {
    this._element
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const btn = evt.target.querySelector(`.event__save-btn`);
        const text = btn.textContent;
        btn.textContent = btn.dataset.alt;
        this._disableForm(true);
        handler(evt).catch(() => {
          btn.textContent = text;
          this._disableForm(false);
          this._element.classList.add(`shake`);
        });
      });
  }

  setClickDeleteButtonHandler(handler) {
    const element = this.getElement().querySelector(`.event__reset-btn[type="delete"]`);
    if (element) {
      element.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const btn = evt.target;
        const text = btn.textContent;
        btn.textContent = btn.dataset.alt;
        this._disableForm(true);
        handler(evt).catch(() => {
          btn.textContent = text;
          this._disableForm(false);
          this._element.classList.add(`shake`);
        });
      });
    }
  }

  setClickFavoriteButtonHandler(handler) {
    this._element
        .querySelector(`.event__favorite-checkbox`)
        .addEventListener(`change`, handler);
  }

  setInputHandler(handler) {
    this._element
        .querySelector(`.event__input--destination`)
        .addEventListener(`keydown`, handler);
  }

  setPriceInputHandler(handler) {
    this._element
        .querySelector(`.event__input--price`)
        .addEventListener(`input`, handler);
  }

  setClickCancelButtonHandler(handler) {
    const element = this.getElement().querySelector(`.event__reset-btn[type="reset"]`);
    if (element) {
      element.addEventListener(`click`, handler);
    }
  }

  setCheckOfferHandler(handler) {
    this._element
        .querySelectorAll(`.event__offer-checkbox`).forEach((inputElement) => {
          inputElement.addEventListener(`change`, handler);
        });
  }
}
