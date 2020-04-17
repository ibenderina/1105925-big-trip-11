import {EVENT_TYPES, EVENT_CITIES, DESCRIPTION, OFFERS} from "../consts.js";

const mockPhotos = (count) => {
  return new Array(count).fill(``).map(function () {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomElements = (element, min, max) => {
  const randomIndex = getRandomIntegerNumber(0, element.length);
  return element.slice(randomIndex, randomIndex + getRandomIntegerNumber(min, max));
};

const createTripDataElement = () => {
  let date = getRandomDate();
  return {
    targetType: getRandomArrayItem(EVENT_TYPES),
    destination: getRandomArrayItem(EVENT_CITIES),
    offers: getRandomElements(OFFERS, 0, 5),
    info: {
      description: getRandomElements(DESCRIPTION, 1, 5),
      photos: mockPhotos(getRandomIntegerNumber(1, 5))
    },
    checkin: date,
    checkout: new Date(new Date(date).setHours(date.getHours() + 2.5)),
    price: getRandomIntegerNumber(120, 1400)
  };
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

export const getTripData = () => {
  return new Array(getRandomIntegerNumber(15, 20)).fill(``).map(createTripDataElement).sort((a, b) => {
    return a.checkin - b.checkin;
  });
};
