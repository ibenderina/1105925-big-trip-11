export default class Offer {
  constructor(data) {
    this.name = data.title;
    this.price = data.price;
    this.isChecked = false;
  }

  toRAW() {
    return {
      "title": this.name,
      "price": this.price,
    };
  }

  static parseMany(offers) {
    return offers.map((offer) => {
      return new Offer(offer);
    });
  }
}
