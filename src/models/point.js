import Destination from "@models/destination";
import {ACTIVITY, TRANSFER, EVENT_TYPES} from "@consts";
import Offer from "@models/offer";

export default class Point {
  constructor(data, offers) {
    this.id = null;
    this.isFavorites = false;
    this.targetType = {
      name: EVENT_TYPES.DEFAULT,
      type: TRANSFER
    };
    this.destination = ``;
    this.offers = [];
    this.info = new Destination();
    this.checkin = new Date();
    this.checkout = new Date();
    this.price = 0;
    this._parse(data, offers);
  }

  clone() {
    const newPoint = Object.assign(new Point(), this);
    newPoint.offers = this.offers.map((offer) => {
      return Object.assign(new Offer(), offer);
    });
    return newPoint;
  }

  toRAW() {
    return {
      "id": this.id,
      "is_favorite": this.isFavorites,
      "destination": this.info.toRAW(),
      "date_from": this.checkin,
      "date_to": this.checkout,
      "base_price": this.price,
      "type": this.targetType.name,
      "offers": (this.offers || []).filter((offer) => {
        return offer.isChecked;
      }).map((offer) => {
        return offer.toRAW();
      })
    };
  }

  _parse(data, offers) {
    if (data) {
      this.id = data[`id`];
      this.isFavorites = data[`is_favorite`];
      this.targetType = {
        name: data[`type`],
        type: [EVENT_TYPES.ACTIVE].includes(data[`type`]) ? ACTIVITY : TRANSFER
      };
      this.destination = data[`destination`][`name`];
      this.info = new Destination(data[`destination`]);
      this.checkin = new Date(data[`date_from`]);
      this.checkout = new Date(data[`date_to`]);
      this.price = data[`base_price`];
      this.offers = offers.map((offer) => {
        const newOffer = Object.assign(new Offer(), offer);
        newOffer[`isChecked`] = !!data[`offers`].find((checkedOffer) => {
          return checkedOffer[`title`] === newOffer[`name`];
        });
        return newOffer;
      });
    } else if (offers) {
      this.offers = offers.map((offer) => {
        return Object.assign(new Offer(), offer);
      });
    }
  }

  static parse(points, offers) {
    return points.map((point) => {
      return new Point(point, offers.findOffers(point[`type`]));
    });
  }
}
