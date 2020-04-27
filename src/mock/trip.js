import {EVENT_TYPES, EVENT_CITIES, DESCRIPTION, OFFERS, dataCount} from "Consts";

const mockPhotos = (count) => {
  return new Array(count).fill(``).map(function () {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(dataCount.EMPTY_MOCKS, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomElements = (element, min, max) => {
  const randomIndex = getRandomIntegerNumber(dataCount.EMPTY_MOCKS, element.length);
  return element.slice(randomIndex, randomIndex + getRandomIntegerNumber(min, max));
};

const createTripDataElement = () => {
  let date = getRandomDate();
  return {
    targetType: getRandomArrayItem(EVENT_TYPES),
    destination: getRandomArrayItem(EVENT_CITIES),
    offers: getRandomElements(OFFERS, dataCount.EMPTY_MOCKS, dataCount.MAX_MOCKS),
    info: {
      description: getRandomElements(DESCRIPTION, dataCount.MIN_MOCKS, dataCount.MAX_MOCKS),
      photos: mockPhotos(getRandomIntegerNumber(dataCount.MIN_MOCKS, dataCount.MAX_MOCKS))
    },
    checkin: date,
    checkout: new Date(new Date(date).setHours(date.getHours() + getRandomIntegerNumber(dataCount.MIN_TIME, dataCount.MAX_TIME))),
    price: getRandomIntegerNumber(dataCount.MIN_PRICE, dataCount.MAX_PRICE)
  };
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(dataCount.START_WEEK, dataCount.END_WEEK);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

const getTripData = () => {
  return new Array(getRandomIntegerNumber(dataCount.MIN_TRIPS, dataCount.MAX_TRIPS)).fill(``).map(createTripDataElement).sort((a, b) => {
    return a.checkin - b.checkin;
  });
};

export {getRandomElements, getTripData, getRandomIntegerNumber, mockPhotos};
