import {remove, replace} from "@utils/render";
import {getDigits, isEnterPressed, isEscPressed} from "@utils/common";
import EventComponent from "@components/event/event";
import EditComponent from "@components/edit/edit";
import {EventsSortMode} from "@consts";

export default class PointController {
  constructor(container, modelDestinations, modelOffers, onDataChange, onViewChange, onCloseNewEvent) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCloseNewEvent = onCloseNewEvent;
    this._modelDestinations = modelDestinations;
    this._modelOffers = modelOffers;

    this._eventComponent = null;
    this._editComponent = null;
    this._mode = EventsSortMode.DEFAULT;
    this._trip = null;
    this._sourceTrip = null;

    this._replaceTripToEdit = this._replaceTripToEdit.bind(this);
    this._replaceTripToEvent = this._replaceTripToEvent.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._onToggleKeydownEnter = this._onToggleKeydownEnter.bind(this);
    this._eventTypeChanger = this._eventTypeChanger.bind(this);
    this._destinationChanger = this._destinationChanger.bind(this);
    this._rollup = this._rollup.bind(this);
    this._favoriteChanger = this._favoriteChanger.bind(this);
  }

  destroy() {
    remove(this._editComponent);
    remove(this._eventComponent);

    document.removeEventListener(`keydown`, this._onEscKeydown);
  }

  render(trip) {
    if (!this._sourceTrip) {
      this._sourceTrip = trip.clone();
    }
    this._trip = trip.clone();
    const oldEventComponent = this._eventComponent;
    const oldEditComponent = this._editComponent;

    this._eventComponent = new EventComponent(trip);
    this._editComponent = new EditComponent(trip, this._modelDestinations.getDestinations());

    this._eventComponent.setClickRollupButtonHandler(this._replaceTripToEdit);

    if (oldEditComponent && oldEventComponent) {
      replace(this._editComponent, oldEditComponent);
      replace(this._eventComponent, oldEventComponent);
      this._setEventEditListeners();
      oldEditComponent.removeElement();
      oldEventComponent.removeElement();
    } else {
      this._container.appendChild(this._eventComponent.getElement());
      if (!trip.id) {
        this._replaceTripToEdit();
      }
    }
  }

  setDefaultView() {
    if (this._mode !== EventsSortMode.DEFAULT) {
      this._rollup();
    }
  }

  _rollup() {
    return this._onDataChange(this, this._trip, this._sourceTrip)
      .then(this._replaceTripToEvent);
  }

  _forbidDestination(evt) {
    evt.preventDefault();
    evt.target.value = ``;
  }

  _changePrice(evt) {
    evt.preventDefault();
    evt.target.value = getDigits(evt.target.value);
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
    this._setEventEditListeners();
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
    const newTrip = Object.assign(this._trip.clone(), this._editComponent.getData(), {
      targetType: {
        name: input.value,
        type: input.dataset[`type`]
      },
      offers: this._modelOffers.findOffers(input.value)
    });
    this._onDataChange(this, this._trip, newTrip);
  }

  _destinationChanger(evt) {
    const destination = this._modelDestinations.findDestination(evt.target.value);
    if (destination) {
      const newTrip = Object.assign(this._trip.clone(), this._editComponent.getData(), {
        destination: evt.target.value,
        info: destination
      });
      this._onDataChange(this, this._trip, newTrip);
    }
  }

  _replaceTripToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeydown);
    this._mode = EventsSortMode.DEFAULT;
    if (this._trip.id) {
      return replace(this._eventComponent, this._editComponent);
    }
    return this._onCloseNewEvent();
  }

  _favoriteChanger(evt) {
    this._trip.isFavorites = evt.target.checked;
    if (this._trip.id) {
      return this._onDataChange(this, this._trip, this._trip, true);
    }
    return Promise.resolve();
  }

  _setEventEditListeners() {
    this._editComponent.getElement();
    this._editComponent.setChangeDestinationHandler(this._destinationChanger);
    this._editComponent.setClickFavoriteButtonHandler(this._favoriteChanger);

    this._editComponent.setClickRollupButtonHandler(this._rollup);
    this._editComponent.setClickCancelButtonHandler(this._replaceTripToEvent);
    this._editComponent.setClickDeleteButtonHandler((evt) => {
      return this._onDataChange(null, this._trip, null, true).then(() => {
        this._replaceTripToEvent(evt);
      });
    });
    this._editComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      return this._onDataChange(
          null, this._trip, Object.assign(this._trip.clone(), this._editComponent.getData()), true
      ).then(() => {
        this._replaceTripToEvent();
        document.removeEventListener(`keydown`, this._onEscKeydown);
      });
    });
    this._editComponent.setToggleKeydownEnterHandler(this._onToggleKeydownEnter);
    this._editComponent.setChangeEventTypeHandler(this._eventTypeChanger);
    this._editComponent.setInputHandler(this._forbidDestination);
    this._editComponent.setPriceInputHandler(this._changePrice);

    this._editComponent.setCheckOfferHandler((evt) => {
      const isChecked = evt.target.checked;
      const name = evt.target.name;
      const offer = this._trip.offers.find((_offer) => {
        return _offer.name.toLowerCase() === name;
      });
      if (offer) {
        offer.isChecked = isChecked;
      }
    });
  }
}
