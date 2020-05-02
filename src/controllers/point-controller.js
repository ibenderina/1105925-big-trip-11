import EventComponent from "@components/event/event";
import EditComponent from "@components/edit/edit";
import {remove, replace} from "@utils/render";
import {capitalize, getDigits, isEnterPressed, isEscPressed} from "@utils/common";
import {getRandomElements, getRandomIntegerNumber, mockPhotos} from "../mock/trip";
import {DESCRIPTION, OFFERS, EventsSortMode} from "@consts";

export default class PointController {
  constructor(container, onDataChange, onViewChange, onCloseNewEvent) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCloseNewEvent = onCloseNewEvent;

    this._eventComponent = null;
    this._editComponent = null;
    this._mode = EventsSortMode.DEFAULT;
    this._trip = null;

    this._replaceTripToEdit = this._replaceTripToEdit.bind(this);
    this._replaceTripToEvent = this._replaceTripToEvent.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._onToggleKeydownEnter = this._onToggleKeydownEnter.bind(this);
    this._eventTypeChanger = this._eventTypeChanger.bind(this);
    this._destinationChanger = this._destinationChanger.bind(this);
  }

  destroy() {
    remove(this._editComponent);
    remove(this._eventComponent);

    document.removeEventListener(`keydown`, this._onEscKeydown);
  }

  render(trip) {
    this._trip = trip;
    const oldEventComponent = this._eventComponent;
    const oldEditComponent = this._editComponent;

    this._eventComponent = new EventComponent(trip);
    this._editComponent = new EditComponent(trip);

    this._setEventListeners();

    if (oldEditComponent && oldEventComponent) {
      replace(this._editComponent, oldEditComponent);
      replace(this._eventComponent, oldEventComponent);
    } else {
      this._mode = trip.id ? this._mode : EventsSortMode.EDIT;
      this._container.appendChild(this._eventComponent.getElement());
      if (this._mode === EventsSortMode.EDIT) {
        this._replaceTripToEdit();
      }
    }
  }

  setDefaultView() {
    if (this._mode !== EventsSortMode.DEFAULT) {
      this._replaceTripToEvent();
    }
  }

  _onEscKeydown(evt) {
    if (isEscPressed(evt.key)) {
      this._replaceTripToEvent();
    }
  }

  _replaceTripToEdit() {
    document.addEventListener(`keydown`, this._onEscKeydown);
    this._onViewChange();
    this._mode = EventsSortMode.EDIT;
    return replace(this._editComponent, this._eventComponent);
  }

  _onToggleKeydownEnter(evt) {
    if (isEnterPressed(evt.key)) {
      evt.stopPropagation();
      const eventTypeToggle = evt.target.querySelector(`.event__type-toggle`);
      eventTypeToggle.checked = !eventTypeToggle.checked;
    }
  }

  _eventTypeChanger(evt) {
    const input = evt.target;
    const newTrip = Object.assign({}, this._trip, {
      targetType: {
        name: capitalize(input.value),
        type: input.dataset[`type`]
      },
      offers: getRandomElements(OFFERS, 0, 5)
    });
    this._onDataChange(this, this._trip, newTrip);
  }

  _destinationChanger(evt) {
    const newTrip = Object.assign({}, this._trip, {
      destination: evt.target.value,
      info: {
        description: getRandomElements(DESCRIPTION, 1, 5),
        photos: mockPhotos(getRandomIntegerNumber(1, 5))
      }
    });
    this._onDataChange(this, this._trip, newTrip);
  }

  _replaceTripToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeydown);
    if (this._trip.id) {
      return replace(this._eventComponent, this._editComponent);
    }
    return this._onCloseNewEvent();
  }

  _forbidDestination(evt) {
    evt.preventDefault();
    evt.target.value = ``;
  }

  _changePrice(evt) {
    evt.preventDefault();
    evt.target.value = getDigits(evt.target.value);
  }

  _setEventListeners() {
    this._eventComponent.setClickButtonHandler(this._replaceTripToEdit);

    this._editComponent.setChangeDestinationHandler(this._destinationChanger);
    this._editComponent.setClickButtonHandler(this._replaceTripToEvent);
    this._editComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(null, this._trip, Object.assign({}, this._trip, this._editComponent.getData()));
      this._replaceTripToEvent();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    });
    this._editComponent.setToggleKeydownEnterHandler(this._onToggleKeydownEnter);
    this._editComponent.setChangeEventTypeHandler(this._eventTypeChanger);
    this._editComponent.setClickFavoriteButtonHandler(this._onDataChange);
    this._editComponent.setInputHandler(this._forbidDestination);
    this._editComponent.setPriceInputHandler(this._changePrice);
    this._editComponent.setClickCancelButtonHandler(this._replaceTripToEvent);
  }
}
