const createTripInfoTemplate = (shownMainBlock) => {
  let mainBlock = ``;
  if (shownMainBlock) {
    mainBlock = `<div class="trip-info__main">
                    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
                    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
                 </div>`;
  }
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${mainBlock}
    </section>`);
};

export {createTripInfoTemplate};
