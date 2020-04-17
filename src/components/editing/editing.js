import {createElement, capitalize} from "../../utils";
import {createEditTemplate} from "./editing-tpl.js";
import {Key} from "../../consts";
import flatpickr from "flatpickr";

export default class TripEdit {
  constructor(trip, replaceToEvent) {
    this._trip = trip;
    this._element = null;
    this._replaceToEvent = replaceToEvent;
  }

  getTemplate() {
    return createEditTemplate(this._trip);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, this._replaceToEvent);
      this._element.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this._replaceToEvent();
      });
      const eventTypeOutput = this._element.querySelector(`.event__type-output`);
      const eventTypeButton = this._element.querySelectorAll(`.event__type-input`);
      const eventTypeIcon = this._element.querySelector(`.event__type-icon`);
      const eventTypeWrapper = this._element.querySelector(`.event__type-wrapper`);
      const eventTypeToggle = this._element.querySelector(`.event__type-toggle`);
      flatpickr(this._element.querySelector(`.event__input--time`), {
        enableTime: true,
        minDate: `today`,
        dateFormat: `d/m/Y H:i`,
      });

      const onToggleKeydownEnter = (evt) => {
        if (evt.key === Key.ENTER) {
          evt.stopPropagation();
          eventTypeToggle.checked = !eventTypeToggle.checked;
        }
      };

      eventTypeButton.forEach(function (element) {
        element.addEventListener(`change`, function (evt) {
          const input = evt.target;
          eventTypeOutput.textContent = capitalize(input.value) + ` ` + input.dataset[`type`];
          eventTypeIcon.src = `img/icons/${input.value}.png`;
        });
      });
      eventTypeWrapper.addEventListener(`keydown`, onToggleKeydownEnter);
    }
    const onEscKeydown = (evt) => {
      if (evt.key === Key.ESC) {
        document.removeEventListener(`keydown`, onEscKeydown);
        this._replaceToEvent(evt);
      }
    };
    document.addEventListener(`keydown`, onEscKeydown);
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
