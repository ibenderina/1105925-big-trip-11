import {getFormattedDate} from "../../utils/common";

const createTripDayTemplate = (checkin, index) => {
  const monthName = checkin.toLocaleString(`default`, {month: `short`});
  const day = checkin.getDate();
  const date = getFormattedDate(checkin, `Y-m-d`);
  return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="${date}">
            ${monthName} ${day}
          </time>
        </div>
      </li>`;
};

export {createTripDayTemplate};
