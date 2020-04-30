import {formatDate} from "@utils/common";

const showDayInfo = (checkin, index, hiddenDayInfo) => {
  const visibilityHidden = hiddenDayInfo ? `visibility-hidden` : ``;
  const monthName = checkin.toLocaleString(`default`, {month: `short`});
  const day = checkin.getDate();
  const date = formatDate(checkin);
  return `<div class="day__info ${visibilityHidden}">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="${date}">
            ${monthName} ${day}
            </time>
         </div>`;
};

const createTripDayTemplate = (checkin, index) => {
  const hiddenDayInfo = typeof index !== `number`;
  const dayInfo = showDayInfo(checkin, index, hiddenDayInfo);
  return `<li class="trip-days__item  day">${dayInfo}</li>`;
};

export {createTripDayTemplate};
