import AbstractComponent from "@abstract";
import {createStatsBlock} from "../stats/stats-tpl";

export default class Stats extends AbstractComponent {
  getTemplate() {
    return createStatsBlock();
  }
}
