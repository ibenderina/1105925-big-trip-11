import {EVENT_TYPES, EVENT_CITIES, DESCRIPTION, OFFERS, MocksDataCount, DataCount} from "@consts";

const mockPhotos = (count) => {
  return new Array(count).fill(``).map(function () {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(MocksDataCount.EMPTY, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomElements = (element, min, max) => {
  const randomIndex = getRandomIntegerNumber(MocksDataCount.EMPTY, element.length);
  return element.slice(randomIndex, randomIndex + getRandomIntegerNumber(min, max));
};

const createTripDataElement = () => {
  let date = getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    targetType: getRandomArrayItem(EVENT_TYPES),
    destination: getRandomArrayItem(EVENT_CITIES),
    offers: getRandomElements(OFFERS, MocksDataCount.EMPTY, MocksDataCount.MAX),
    info: {
      description: getRandomElements(DESCRIPTION, MocksDataCount.MIN, MocksDataCount.MAX),
      photos: mockPhotos(getRandomIntegerNumber(MocksDataCount.MIN, MocksDataCount.MAX))
    },
    checkin: date,
    checkout: new Date(new Date(date).setHours(date.getHours() + getRandomIntegerNumber(MocksDataCount.MIN_TIME, MocksDataCount.MAX_TIME))),
    price: getRandomIntegerNumber(MocksDataCount.MIN_PRICE, MocksDataCount.MAX_PRICE)
  };
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(DataCount.START_WEEK, DataCount.END_WEEK);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

const getTripData = () => {
  return new Array(getRandomIntegerNumber(MocksDataCount.MIN_SHOWN_TRIPS, MocksDataCount.MAX_SHOWN_TRIPS)).fill(``).map(createTripDataElement).sort((a, b) => {
    return a.checkin - b.checkin;
  });
};

export {getRandomElements, getTripData, getRandomIntegerNumber, mockPhotos, createTripDataElement};
