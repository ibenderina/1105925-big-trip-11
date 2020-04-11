const TimeValue = {
  MIN: 60,
  HOURS: 60,
  SEC: 1000
};

export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTime = (date) => {
  const minute = `0${date.getMinutes()}`.slice(-2);
  return `${date.getHours()}:${minute}`;
};

export const getDuration = (time) => {
  const start = new Date(time.checkin);
  const end = new Date(time.checkout);
  const durationMinutesAll = (end - start) / (TimeValue.SEC * TimeValue.MIN);
  const durationHours = durationMinutesAll / TimeValue.HOURS;
  const durationMinutes = durationMinutesAll - durationHours * TimeValue.MIN;
  if (durationMinutes === 0) {
    return `${durationHours}H`;
  } else {
    return `${durationHours}H ${durationMinutesAll - durationHours * TimeValue.MIN}MIN`;
  }
};

export const tripDate = (events) => {
  return [...new Set(events.map((trip) => {
    return `${trip.checkin.getFullYear()}-${trip.checkin.getMonth()}-${trip.checkin.getDate()}`;
  }))];
};

const addLeadZero = (argument) => {
  return `0${argument}`.slice(-2);
};

export const getFormattedDate = (format, date) => {
  format = format.replace(`d`, addLeadZero(date.getDate()));
  format = format.replace(`m`, addLeadZero(date.getMonth()));
  format = format.replace(`Y`, date.getFullYear());
  format = format.replace(`H`, addLeadZero(date.getHours()));
  format = format.replace(`i`, addLeadZero(date.getMinutes()));
  return format;
};
