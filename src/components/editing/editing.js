import {createElement} from "../../utils";
import {createEditTemplate} from "./editing-tpl.js";

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
      });

      // //TODO - тут все поправить
      //
      // const eventTypeOutput = document.querySelector(`.event__type-output`);
      // const eventTypeButton = document.querySelectorAll(`.event__type-input`);
      // const eventTypeIcon = document.querySelector(`.event__type-icon`);
      // const eventTypeWrapper = document.querySelector(`.event__type-wrapper`);
      // const eventTypeToggle = document.querySelector(`.event__type-toggle`);
      //
      // const onToggleKeydownEsc = (evt) => {
      //   if (evt.key === Key.ESC) {
      //     eventTypeToggle.checked = false;
      //   }
      // };
      //
      // const onToggleKeydownEnter = (evt) => {
      //   if (evt.key === Key.ENTER) {
      //     evt.stopPropagation();
      //     eventTypeToggle.checked = !eventTypeToggle.checked;
      //   }
      // };
      //
      // eventTypeButton.forEach(function (element) {
      //   element.addEventListener(`change`, function (evt) {
      //     const input = evt.target;
      //     eventTypeOutput.textContent = capitalize(input.value) + ` ` + input.dataset[`type`];
      //     eventTypeIcon.src = `img/icons/${input.value}.png`;
      //   });
      // });
      //
      // document.addEventListener(`keydown`, onToggleKeydownEsc);
      // eventTypeWrapper.addEventListener(`keydown`, onToggleKeydownEnter);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
