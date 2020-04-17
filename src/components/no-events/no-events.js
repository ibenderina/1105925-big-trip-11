import {createElement} from "../../utils.js";
import {createNoEventsTemplate} from "../no-events/no-events-tpl";

export default class NoEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoEventsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
