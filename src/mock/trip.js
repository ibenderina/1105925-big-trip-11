export const transfer = `to`;
export const activity = `in`;
export const eventTypes = [
  {
    name: `Taxi`,
    type: transfer
  },
  {
    name: `Bus`,
    type: transfer
  },
  {
    name: `Train`,
    type: transfer
  },
  {
    name: `Ship`,
    type: transfer
  },
  {
    name: `Transport`,
    type: transfer
  },
  {
    name: `Drive`,
    type: transfer
  },
  {
    name: `Flight`,
    type: transfer
  },
  {
    name: `Check-in`,
    type: activity
  },
  {
    name: `Sightseeing`,
    type: activity
  },
  {
    name: `Restaurant`,
    type: activity
  }
];
export const eventCities = [`Gallifrey`, `Mandalor`, `Tatooine`, `Death Star`];
const description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const offers = [
  {
    name: `Hang out with AC/DC`,
    price: `100`
  },
  {
    name: `Add an all-day sesh`,
    price: `20`
  },
  {
    name: `Travel by horse`,
    price: `140`
  },
  {
    name: `Get a slap`,
    price: `200`
  },
  {
    name: `Add cute kittens`,
    price: `45`
  }];

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
    targetType: getRandomArrayItem(eventTypes),
    destination: getRandomArrayItem(eventCities),
    offers: getRandomElements(offers, 0, 5),
    info: {
      description: getRandomElements(description, 1, 5),
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
