import moment from "moment";

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const calcTotalCost = (trips) => {
  return trips.reduce((sum, trip) => {
    return sum + trip.price;
  }, 0);
};

export const getDuration = (time) => {
  const duration = moment.duration(time.checkout - time.checkin);
  const days = duration.days() ? `${duration.days()}D` : ``;
  const hours = duration.hours() ? `${duration.hours()}H` : ``;
  const minutes = duration.minutes() ? `${duration.minutes()}M` : ``;
  return `${days} ${hours} ${minutes}`;
};

export const getUniqueTripDates = (events) => {
  return [...new Set(events.map((trip) => {
    return formatDate(trip.checkin, `Y-m-d`);
  }))];
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY/MM/DD`);
};
