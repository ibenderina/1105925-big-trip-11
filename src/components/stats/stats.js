import AbstractComponent from "@abstract";
import {createStatsTemplate, moneyChart, transportChart, timeChart} from "./stats-tpl";

export default class Stats extends AbstractComponent {
  constructor(modelPoints) {
    super();
    this._modelPoints = modelPoints;
    this._charts = [];
  }

  getTemplate() {
    return createStatsTemplate();
  }

  getElement() {
    super.getElement();
    this._moneyCtx = this._element.querySelector(`.statistics__chart--money`);
    this._transportCtx = this._element.querySelector(`.statistics__chart--transport`);
    this._timeSpendCtx = this._element.querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    this._moneyCtx.height = BAR_HEIGHT * 6;
    this._transportCtx.height = BAR_HEIGHT * 6;
    this._timeSpendCtx.height = BAR_HEIGHT * 6;

    return this._element;
  }

  render() {
    if (this._charts.length) {
      this._charts.forEach((chart) => {
        chart.destroy();
      });
    }

    this._charts = [
      moneyChart(this._moneyCtx, this._renderMoneyChart()),
      transportChart(this._transportCtx, this._renderTransportChart()),
      timeChart(this._timeSpendCtx, this._renderTimeChart())
    ];
  }

  _getChartData(callback) {
    const trips = this._modelPoints.getTrips();
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
