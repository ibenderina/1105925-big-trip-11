export const TRANSFER = `to`;

export const ACTIVITY = `in`;

export const EVENT_TYPES = {
  ACTIVE: [`Check-in`, `Sightseeing`, `Restaurant`],
  TRANSFER: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  DEFAULT: `taxi`
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};

export const SortType = {
  TIME: `by-time`,
  PRICE: `by-price`,
  DEFAULT: `default`
};

export const EventsSortMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const DataCount = {
  MIN_SHOWN_OFFERS: 0,
  MAX_SHOWN_OFFERS: 3,
  START_WEEK: 0,
  END_WEEK: 8,
  MAX_SHOWN_DESTINATIONS: 3
};

export const Key = {
  ESC: [`Escape`, `Ecs`],
  ENTER: `Enter`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const HIDDEN_CLASS = `visually-hidden`;

export const MenuItem = {
  STATISTICS: `stats`,
  TRIPS: `trips`
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const LOCAL_STORE_KEYS = {
  POINTS: `points`,
  REMOVED_POINTS: `removed-points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`
};

export const STORAGE = `bigtrip-localstorage-v3`;
