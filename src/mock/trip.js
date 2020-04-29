import {EVENT_TYPES, EVENT_CITIES, DESCRIPTION, OFFERS, mocksDataCount, dataCount} from "@consts";

const mockPhotos = (count) => {
  return new Array(count).fill(``).map(function () {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(mocksDataCount.EMPTY, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomElements = (element, min, max) => {
  const randomIndex = getRandomIntegerNumber(mocksDataCount.EMPTY, element.length);
  return element.slice(randomIndex, randomIndex + getRandomIntegerNumber(min, max));
};

const createTripDataElement = () => {
  let date = getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    targetType: getRandomArrayItem(EVENT_TYPES),
    destination: getRandomArrayItem(EVENT_CITIES),
    offers: getRandomElements(OFFERS, mocksDataCount.EMPTY, mocksDataCount.MAX),
    info: {
      description: getRandomElements(DESCRIPTION, mocksDataCount.MIN, mocksDataCount.MAX),
      photos: mockPhotos(getRandomIntegerNumber(mocksDataCount.MIN, mocksDataCount.MAX))
    },
    checkin: date,
    checkout: new Date(new Date(date).setHours(date.getHours() + getRandomIntegerNumber(mocksDataCount.MIN_TIME, mocksDataCount.MAX_TIME))),
    price: getRandomIntegerNumber(mocksDataCount.MIN_PRICE, mocksDataCount.MAX_PRICE)
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
  return new Array(getRandomIntegerNumber(mocksDataCount.MIN_SHOWN_TRIPS, mocksDataCount.MAX_SHOWN_TRIPS)).fill(``).map(createTripDataElement).sort((a, b) => {
    return a.checkin - b.checkin;
  });
};

export {getRandomElements, getTripData, getRandomIntegerNumber, mockPhotos};
