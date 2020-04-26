export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};

const Key = {
  ESC: [`Escape`, `Ecs`],
  ENTER: `Enter`
};

export const isEscPressed = (key) => Key.ESC.includes(key);

export const isEnterPressed = (key) => key === Key.ENTER;

export const TRANSFER = `to`;

export const ACTIVITY = `in`;

export const EVENT_TYPES = [
  {
    name: `Taxi`,
    type: TRANSFER
  },
  {
    name: `Bus`,
    type: TRANSFER
  },
  {
    name: `Train`,
    type: TRANSFER
  },
  {
    name: `Ship`,
    type: TRANSFER
  },
  {
    name: `Transport`,
    type: TRANSFER
  },
  {
    name: `Drive`,
    type: TRANSFER
  },
  {
    name: `Flight`,
    type: TRANSFER
  },
  {
    name: `Check-in`,
    type: ACTIVITY
  },
  {
    name: `Sightseeing`,
    type: ACTIVITY
  },
  {
    name: `Restaurant`,
    type: ACTIVITY
  }
];

export const EVENT_CITIES = [`Gallifrey`, `Mandalor`, `Tatooine`, `Death Star`];

export const DESCRIPTION = [
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

export const OFFERS = [
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

export const TimeValue = {
  MIN: 60,
  HOURS: 60,
  SEC: 1000
};

export const SortType = {
  TIME: `by-time`,
  PRICE: `by-price`,
  DEFAULT: `default`
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const dataCount = {
  EMPTY_MOCKS: 1,
  MIN_MOCKS: 1,
  MAX_MOCKS: 5,
  MIN_SHOWN_OFFERS: 0,
  MAX_SHOWN_OFFERS: 3,
  MIN_TIME: 1,
  MAX_TIME: 45,
  MIN_PRICE: 120,
  MAX_PRICE: 1400,
  MIN_TRIPS: 15,
  MAX_TRIPS: 15,
  START_WEEK: 0,
  END_WEEK: 8,
  MAX_DESTINATIONS: 3
};

export const notDigit = new RegExp(`[^0-9]`, `gim`);
