import moment from "moment";

const createTripInfoDates = (datesOfTrip) => {
  return [
    moment(datesOfTrip.min).format(`D MMM`),
    moment(datesOfTrip.max).format(`D MMM`)
  ].join(` — `);
};

const createTripInfoTemplate = (destinations, datesOfTrip) => {
  let mainBlock = ``;
  if (destinations && datesOfTrip) {
    mainBlock = `<div class="trip-info__main">
                    <h1 class="trip-info__title">${destinations}</h1>
                    <p class="trip-info__dates">${createTripInfoDates(datesOfTrip)}</p>
                 </div>`;
  }
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${mainBlock}
    </section>`);
};

export {createTripInfoTemplate};
