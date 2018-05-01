import * as gameData from '../data/game-data.js';
import AbstractView from "../abstract-view";
import FooterView from './footer-view.js';
import getStatsBar from './statsbar';

const TYPE_BONUS_TEMPLATE = {
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
  return `<td class="result__extra">${TYPE_BONUS_TEMPLATE[type].title}</td>
        <td class="result__extra">${count}&nbsp;<span class="stats__result ${TYPE_BONUS_TEMPLATE[type].class}"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${count * 50}</td>`;
};

export default class StatsView extends AbstractView {
  constructor(win, stats) {
    super();
    this._win = win;
    this._stats = stats;
  }

  get template() {
    return `
    <div class="result">
      <h1>${(this._win ? `Победа!` : `Вы проиграли :( как же так?`)}</h1>
      ${this._stats.map((stat, i) => `<table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            ${getStatsBar(stat.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${stat.answers.filter((it) => it.result > 0).length * 100}</td>
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`fast`, stat.answers.filter((it) => it.result > 0 && it.time < gameData.answersTime.FAST).length)}
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`alive`, stat.lives)}
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`slow`, stat.answers.filter((it) => it.result > 0 && it.time > gameData.answersTime.SLOW).length * (-1))}
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${gameData.getResult(stat.answers, stat.lives)}</td>
        </tr>
      </table>`).join(``)}
    </div>
    ${new FooterView().template}`;
  }

}

