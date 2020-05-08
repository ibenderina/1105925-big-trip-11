export default class Offers {
  constructor() {
    this._offers = {};
  }

  findOffers(offerType) {
    return Object.assign([], this._offers[offerType]);
  }

  getOffers() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = offers;
  }
}
