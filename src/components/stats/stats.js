import AbstractComponent from "@abstract";
import {createStatsTemplate, moneyChart, transportChart, timeChart} from "../stats/stats-tpl";
import {FilterType} from "@consts";

export default class Stats extends AbstractComponent {
  constructor(modelPoints) {
    super();
    this.__modelPoints = modelPoints;
  }

  getTemplate() {
    return createStatsTemplate();
  }

  getElement() {
    const container = super.getElement();
    const moneyCtx = container.querySelector(`.statistics__chart--money`);
    const transportCtx = container.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = container.querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    moneyChart(moneyCtx, this._renderMoneyChart());
    transportChart(transportCtx, this._renderTransportChart());
    timeChart(timeSpendCtx, this._renderTimeChart());

    return container;
  }

  _getChartData(callback) {
    const trips = this.__modelPoints.getTrips();
    return Array.from(trips.reduce((groupedTrips, trip) => {
      const targetTypeName = trip.targetType.name.toUpperCase();
      if (!groupedTrips.has(targetTypeName)) {
        groupedTrips.set(targetTypeName, 0);
      }
      groupedTrips.set(targetTypeName, groupedTrips.get(targetTypeName) + callback(trip));
      return groupedTrips;
    }, new Map())).sort((a, b) => {
      return b[1] - a[1];
    });
  }

  _renderMoneyChart() {
    return this._getChartData((trip) => {
      return trip.price;
    });
  }

  _renderTransportChart() {
    return this._getChartData(() => {
      return 1;
    });
  }

  _renderTimeChart() {
    return this._getChartData((trip) => {
      return trip.checkout - trip.checkin;
    });
  }
}
