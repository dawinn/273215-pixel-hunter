import AbstractView from "../abstract-view";
import {Result, getResult} from '../data/game-data.js';
import getStatsBar from './statsbar-view';

const getBonusTemplate = (type, fieldName) => {
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
  return BONUS_TEMPLATE[type][fieldName];
};

const renderBonus = (type, count) => {
  if (count !== 0) {
    return `<tr>
        <td></td>
        <td class="result__extra">${getBonusTemplate(type, `title`)}</td>
        <td class="result__extra">${Math.abs(count)}&nbsp;<span class="stats__result ${getBonusTemplate(type, `class`)}"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${count * 50}</td>
        </tr>`;
  }
  return ``;
};

export default class StatsView extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats;
    this._win = this._stats.win;
    this.head = this.getHead();
    this.content = StatsView.showStat(1, this._stats);
  }

  get template() {
    return `<div class="result">${this.head}
      <div class="stats__all">
        ${this.content}
        <div class="message">Statistics is loading...</div>
      </div>
    </div>`;
  }

  getHead() {
    return `<h1>${(this._win ? `Победа!` : `Вы проиграли :( как же так?`)}</h1>`;
  }

  static showStat(order, stat) {
    return `<table class="result__table">
        <tr>
          <td class="result__number">${order}.</td>
          <td colspan="2">
            ${getStatsBar(stat.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${stat.win ? stat.answers.filter((it) => it !== Result.WRONG).length * 100 : `Fail`}</td>
        </tr>
        ${stat.win ? `
          ${renderBonus(`fast`, stat.answers.filter((it) => it === Result.FAST).length)}
          ${renderBonus(`alive`, stat.lives)}
          ${renderBonus(`slow`, stat.answers.filter((it) => it === Result.SLOW).length * (-1))}
          <td colspan="5" class="result__total  result__total--final">${getResult(stat.answers, stat.lives)}</td>
        </tr>` : ``}
      </table>
      `;
  }

  bind() {
    this._statsContainer = this.element.querySelector(`div.stats__all`);
  }

  showStats(stats) {
    this._statsContainer.innerHTML = ``;
    this._statsContainer.innerHTML = `
    ${stats.map((it, i) => StatsView.showStat(1 + i, it)).join(``)}`;

  }
}

