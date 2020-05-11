export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  findDestination(destinationName) {
    return this._destinations.find((destination) => {
      return destination.name === destinationName;
    });
  }

  getDestinations() {
    return this._destinations;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }
}
