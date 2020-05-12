import {formatDuration} from '@utils/common';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartTitle = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`
};

const createChartTemplate = (ctx, data, formatter, title) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.map((it) => {
        return it[0];
      }),
      datasets: [{
        barThickness: 10,
        data: data.map((it) => {
          return it[1];
        }),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const moneyChart = (moneyCtx, data) => {
  const formatter = (val) => `€ ${val}`;
  return createChartTemplate(moneyCtx, data, formatter, ChartTitle.MONEY);
};

const transportChart = (transportCtx, data) => {
  const formatter = (val) => `${val}x`;
  return createChartTemplate(transportCtx, data, formatter, ChartTitle.TRANSPORT);
};

const timeChart = (timeCtx, data) => {
  const formatter = (val) => `${formatDuration(val)}`;
  return createChartTemplate(timeCtx, data, formatter, ChartTitle.TIME_SPENT);
};

const createStatsTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export {createStatsTemplate, moneyChart, transportChart, timeChart};
