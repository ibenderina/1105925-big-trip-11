import moment from "moment";

const createTripInfoDates = (datesOfTrip) => {
  return datesOfTrip.map((date) => {
    return moment(date).format(`D MMM`);
  }).join(` — `);
};

const createTripInfoTemplate = (shownMainBlock, destinations, datesOfTrip) => {
  let mainBlock = ``;
  if (shownMainBlock) {
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
