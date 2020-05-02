import AbstractComponent from "@abstract";
import {createStatsTemplate} from "../stats/stats-tpl";
import {setCharts} from "../stats/stats-tpl";

export default class Stats extends AbstractComponent {
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

    setCharts(moneyCtx, transportCtx, timeSpendCtx);
    return container;
  }
}
