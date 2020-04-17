import {TimeValue} from "./consts.js";
import flatpickr from "flatpickr";

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calcTotalCost = (trips) => {
  return trips.reduce((sum, trip) => {
    return sum + trip.price;
  }, 0);
};

const getTime = (date) => {
  const minute = `0${date.getMinutes()}`.slice(-2);
  return `${date.getHours()}:${minute}`;
};

const getDuration = (time) => {
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

const tripDate = (events) => {
  return [...new Set(events.map((trip) => {
    return getFormattedDate(trip.checkin, `Y-m-d`);
  }))];
};

const addLeadZero = (argument) => {
  return `0${argument}`.slice(-2);
};

const getFormattedDate = (date, format) => {
  format = format.replace(`d`, addLeadZero(date.getDate()));
  format = format.replace(`m`, addLeadZero(date.getMonth()));
  format = format.replace(`Y`, date.getFullYear());
  format = format.replace(`H`, addLeadZero(date.getHours()));
  format = format.replace(`i`, addLeadZero(date.getMinutes()));
  return format;
};

const render = (container, element, place) => {
  container.insertAdjacentElement(place, element);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export {render, createElement, capitalize, getTime, getDuration, tripDate, getFormattedDate, calcTotalCost};
