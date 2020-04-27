import {createEditTemplate} from "./edit-tpl";
import "flatpickr/dist/flatpickr.min.css";
import AbstractSmartComponent from "../smart";
import {editTripTime} from "Utils/common";

export default class Edit extends AbstractSmartComponent {
  constructor(trip) {
    super();
    this._trip = trip;
    this._flatpickr = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEditTemplate(this._trip);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateEndElement = this.getElement().querySelector(`#event-end-time-1`);
    const dateStartElement = this.getElement().querySelector(`#event-start-time-1`);

    editTripTime(dateStartElement, `today`, (selectedDates, dateStr) => {
      editTripTime(dateEndElement, dateStr);
    });

    editTripTime(dateEndElement, this._trip.checkin);
  }

  setChangeEventTypeHandler(handler) {
    this.getElement()
      .querySelectorAll(`.event__type-input`)
      .forEach((item) => {
        item.addEventListener(`change`, handler);
      });
  }

  setChangeDestinationHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`focusout`, handler);
  }

  setToggleKeydownEnterHandler(handler) {
    this.getElement().querySelector(`.event__type-wrapper`)
      .addEventListener(`keydown`, handler);
  }

  setClickButtonHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setClickFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }

  setInputHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`keydown`, handler);
  }

  setPriceInputHandler(handler) {
    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`input`, handler);
  }
}
