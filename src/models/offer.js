export default class Offer {
  constructor(data) {
    this.name = ``;
    this.price = 0;
    this.isChecked = false;
    if (data) {
      this.name = data.title;
      this.price = data.price;
      this.isChecked = false;
    }
  }

  toRAW() {
    return {
      "title": this.name,
      "price": this.price,
    };
  }

  static parseOffersList(offers) {
    return offers.map((offer) => {
      return new Offer(offer);
    });
  }

  static parseMany(rawOffers) {
    const offers = {};
    rawOffers.forEach((typeOffers) => {
      offers[typeOffers[`type`]] = Offer.parseOffersList(typeOffers[`offers`]);
    });
    return offers;
  }
}
