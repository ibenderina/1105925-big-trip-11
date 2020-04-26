import {DESCRIPTION, isEnterPressed, isEscPressed, OFFERS, Mode} from "Consts";
import {replace} from "Utils/render";
import {capitalize, getDigits} from "Utils/common";
import EventComponent from "Components/event/event";
import EditComponent from "Components/edit/edit";
import {getRandomElements, getRandomIntegerNumber, mockPhotos} from "../mock/trip";

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._eventComponent = null;
    this._editComponent = null;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._trip = null;
    this._replaceTripToEdit = this._replaceTripToEdit.bind(this);
    this._replaceTripToEvent = this._replaceTripToEvent.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._onToggleKeydownEnter = this._onToggleKeydownEnter.bind(this);
    this._eventTypeChanger = this._eventTypeChanger.bind(this);
    this._destinationChanger = this._destinationChanger.bind(this);
  }

  render(trip) {
    this._trip = trip;
    const oldEventComponent = this._eventComponent;
    const oldEditComponent = this._editComponent;

    this._eventComponent = new EventComponent(trip);
    this._editComponent = new EditComponent(trip);

    this._eventComponent.setClickButtonHandler(this._replaceTripToEdit);

    this._editComponent.setChangeDestinationHandler(this._destinationChanger);
    this._editComponent.setClickButtonHandler(this._replaceTripToEvent);
    this._editComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceTripToEvent();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    });
    this._editComponent.setToggleKeydownEnterHandler(this._onToggleKeydownEnter);
    this._editComponent.setChangeEventTypeHandler(this._eventTypeChanger);
    this._editComponent.setClickFavoriteButtonHandler(this._onDataChange);
    this._editComponent.setInputHandler(this._forbidDestination);
    this._editComponent.setPriceInputHandler(this._changePrice);

    if (oldEditComponent && oldEventComponent) {
      replace(this._editComponent, oldEditComponent);
      replace(this._eventComponent, oldEventComponent);
    } else {
      this._container.appendChild(this._eventComponent.getElement());
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceTripToEvent();
    }
  }

  _onEscKeydown(evt) {
    if (isEscPressed(evt.key)) {
      document.removeEventListener(`keydown`, this._onEscKeydown);
      this._replaceTripToEvent();
    }
  }

  _replaceTripToEdit() {
    document.addEventListener(`keydown`, this._onEscKeydown);
    this._onViewChange();
    this._mode = Mode.EDIT;
    replace(this._editComponent, this._eventComponent);
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
    replace(this._eventComponent, this._editComponent);
  }

  _forbidDestination(evt) {
    evt.preventDefault();
    evt.target.value = ``;
  }

  _changePrice(evt) {
    evt.preventDefault();
    evt.target.value = getDigits(evt.target.value);
  }
}
