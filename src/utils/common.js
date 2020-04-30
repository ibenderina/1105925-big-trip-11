import moment from "moment";
import {Key} from "@consts";
import flatpickr from "flatpickr";

export const editTripTime = (element, minDate, onChange) => {
  flatpickr(element, {
    dateFormat: `d/m/Y H:i`,
    enableTime: true,
    onChange,
    minDate
  });
};

export const getDigits = (string) => {
  return string.replace(notDigit, ``);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
    return formatDate(trip.checkin, `d-m-Y`);
  }))];
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YYYY`);
};

export const isEscPressed = (key) => Key.ESC.includes(key);

export const isEnterPressed = (key) => key === Key.ENTER;

export const notDigit = new RegExp(`[^0-9]`, `gim`);
