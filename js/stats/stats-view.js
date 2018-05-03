import AbstractView from "../abstract-view";
import {answersTime, getResult} from '../data/game-data.js';
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
  return `<td class="result__extra">${getBonusTemplate(type, `title`)}</td>
        <td class="result__extra">${Math.abs(count)}&nbsp;<span class="stats__result ${getBonusTemplate(type, `class`)}"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${count * 50}</td>`;
};

export default class StatsView extends AbstractView {
  constructor(stats) {
    super();
    this._statsAll = stats.slice();
    this.currentStat();
  }

  get template() {
    let h1 = `<h1>${(this._win ? `Победа!` : `Вы проиграли :( как же так?`)}</h1>`;
    let content = [];
    do {
      content.push(`<table class="result__table">
        <tr>
          <td class="result__number">${content.length + 1}.</td>
          <td colspan="2">
            ${getStatsBar(this._answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${this._win ? this._answers.filter((it) => it.result > 0).length * 100 : `Fail`}</td>
        </tr>
        ${this._win ? `<tr>
          <td></td>
          ${renderBonus(`fast`, this._answers.filter((it) => it.result && it.time > answersTime.FAST).length)}
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`alive`, this._lives)}
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`slow`, this._answers.filter((it) => it.result && it.time > 0 && it.time < answersTime.SLOW).length * (-1))}
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${getResult(this._answers, this._lives)}</td>
        </tr>` : ``}
      </table>`);
    } while (this.currentStat());

    return `<div class="result">${h1}${content.join(``)}</div>`;
  }

  currentStat() {
    const currentStat = this._statsAll.pop();
    if (currentStat) {
      this._win = currentStat.win;
      this._answers = currentStat.answers;
      this._lives = currentStat.lives;
    }
    return currentStat;
  }

}

