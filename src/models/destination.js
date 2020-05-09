export default class Destination {
  constructor(data) {
    this.description = ``;
    this.name = ``;
    this.photos = [];
    if (data) {
      this.description = data.description;
      this.name = data.name;
      this.photos = data.pictures;
    }
  }

  toRAW() {
    return {
      "description": this.description,
      "name": this.name,
      "pictures": this.photos
    };
  }

  static parseMany(destinations) {
    return destinations.map((destination) => {
      return new Destination(destination);
    });
  }
}
