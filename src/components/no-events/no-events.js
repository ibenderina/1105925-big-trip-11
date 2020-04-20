import AbstractComponent from "../abstract";
import {createNoEventsTemplate} from "../no-events/no-events-tpl";

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return createNoEventsTemplate();
  }
}
