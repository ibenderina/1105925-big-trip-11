import {createEditTemplate} from "./edit-tpl";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import AbstractSmartComponent from "../smart";

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

    const dateElement = this.getElement().querySelectorAll(`.event__input--time`);
    this._flatpickr = flatpickr(dateElement, {
      dateFormat: `Y/m/d H:i`,
      enableTime: true,
    });
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
}
