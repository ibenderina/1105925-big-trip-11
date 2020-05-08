import PointModel from "@models/point";
import OfferModel from "@models/offer";
import DestinationModel from "@models/destination";

export class Provider {
  constructor(api) {
    this._api = api;
  }

  getDestinations() {
    return this._api.getDestinations().then((destinations) => {
      return DestinationModel.parseMany(destinations);
    });
  }

  getOffers() {
    return this._api.getOffers().then((rawOffers) => {
      const offers = {};
      rawOffers.forEach((typeOffers) => {
        offers[typeOffers[`type`]] = OfferModel.parseMany(typeOffers[`offers`]);
      });
      return offers;
    });
  }

  getPoints(offers) {
    return this._api.getPoints().then((points) => {
      return PointModel.parseMany(points, offers);
    });
  }

  updatePoint(point, offers) {
    return this._api.updatePoint(point).then((_point) => {
      return new PointModel(_point, offers.findOffers(_point[`type`]));
    });
  }

  createPoint(point, offers) {
    return this._api.createPoint(point).then((_point) => {
      return new PointModel(_point, offers.findOffers(_point[`type`]));
    });
  }
}
