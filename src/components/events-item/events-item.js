import AbstractComponent from "../abstract";
import {createTripEventsItemTemplate} from "./events-item-tpl";

export default class EventsItem extends AbstractComponent {
  getTemplate() {
    return createTripEventsItemTemplate();
  }
}
