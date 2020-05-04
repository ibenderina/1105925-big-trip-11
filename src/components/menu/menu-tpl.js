const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="trips">Table</a>
      <a class="trip-tabs__btn" href="#" id="stats">Stats</a>
    </nav>`
  );
};

export {createMenuTemplate};
