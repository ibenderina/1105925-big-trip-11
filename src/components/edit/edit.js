import AbstractComponent from "../abstract";
import {createEditTemplate} from "./edit-tpl";

export default class Edit extends AbstractComponent {
  constructor(trip) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createEditTemplate(this._trip);
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
