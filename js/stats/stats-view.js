import AbstractView from "../abstract-view";
import getStatsBar from './statsbar-view';
import {Result,
  getResult,
  BONUS_POINTS,
  ANSWER_POINTS} from '../data/game-data.js';

const BONUS_TEMPLATE = {
  'fast': {
    title: `Бонус за скорость:`,
    class: `stats__result--fast`
  },
  'alive': {
    title: `Бонус за жизни:`,
    class: `stats__result--alive`
  },
  'slow': {
    title: `Штраф за медлительность:`,
    class: `stats__result--slow`
  }
};


const renderBonus = (type, count) => {
  if (count !== 0) {
    return `<tr>
        <td></td>
        <td class="result__extra">${ BONUS_TEMPLATE[type][`title`]}</td>
        <td class="result__extra">${Math.abs(count)}&nbsp;<span class="stats__result ${ BONUS_TEMPLATE[type][`class`]}"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${count * BONUS_POINTS}</td>
        </tr>`;
  }
  return ``;
};

export default class StatsView extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats;
    this._win = this._stats.win;
    this._head = this.head;
    this._content = this.content;
  }

  get template() {
    return `<div class="result">${this.head}
      <div class="stats__all">
        ${this.content}
        <div class="message">Statistics is loading...</div>
      </div>
    </div>`;
  }

  get head() {
    return `<h1>${(this._win ? `Победа!` : `Вы проиграли :( как же так?`)}</h1>`;
  }
  get content() {
    return `${StatsView.showStat(1, this._stats)}`;
  }

  bind() {
    this._statsContainer = this.element.querySelector(`div.stats__all`);
  }

  showStats(stats) {
    stats.reverse();
    this._statsContainer.innerHTML = ``;
    this._statsContainer.innerHTML = `
    ${stats.map((it, i) => StatsView.showStat(1 + i, it)).join(``)}`;
  }

  static showStat(order, stat) {
    return `<table class="result__table">
        <tr>
          <td class="result__number">${order}.</td>
          <td colspan="2">
            ${getStatsBar(stat.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${stat.win ? stat.answers.filter((it) => it !== Result.WRONG).length * ANSWER_POINTS : `Fail`}</td>
        </tr>
        ${stat.win ? `
          ${renderBonus(`fast`, stat.answers.filter((it) => it === Result.FAST).length)}
          ${renderBonus(`alive`, stat.lives)}
          ${renderBonus(`slow`, stat.answers.filter((it) => it === Result.SLOW).length * (-1))}
          <td colspan="5" class="result__total  result__total--final">${getResult(stat.answers, stat.lives)}</td>
        </tr>` : ``}
      </table>`;
  }
}

