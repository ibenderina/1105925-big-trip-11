const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};
const Key = {
  ESC: `Escape`,
  ENTER: `Enter`
};
const TRANSFER = `to`;
const ACTIVITY = `in`;
const EVENT_TYPES = [
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
const EVENT_CITIES = [`Gallifrey`, `Mandalor`, `Tatooine`, `Death Star`];
const DESCRIPTION = [
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
const OFFERS = [
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
const TimeValue = {
  MIN: 60,
  HOURS: 60,
  SEC: 1000
};

export {RenderPosition, Key, TRANSFER, ACTIVITY, EVENT_TYPES, EVENT_CITIES, DESCRIPTION, OFFERS, TimeValue};
