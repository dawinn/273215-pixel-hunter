
import * as gameData from '../data/game-data.js';
import {getHeader} from './header-view.js';
import {getFooter} from './footer-view.js';

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
export const getStats = (stats = `empty`) => {
  const currentType = gameData.STATS_TYPES[0];
  if (stats === `empty`) {
    return `<ul class="stats">${`<li class="stats__result stats__result--${currentType}"></li>`.repeat(10)}</ul>`;
  } else {
    return `<ul class="stats">${stats.map((it) => `<li class="stats__result stats__result--${
      gameData.STATS_TYPES[it.result + 1 + (it.time > 0 && it.time < gameData.ANSWER_TIME.FAST ? 1 : 0) + (it.time > gameData.ANSWER_TIME.SLOW ? 2 : 0)]}"></li>`).join(``)
    }</ul>`;
  }
};

const renderBonus = (type, count) => {
  return `<td class="result__extra">${TYPE_BONUS_TEMPLATE[type].title}</td>
        <td class="result__extra">${count}&nbsp;<span class="stats__result ${TYPE_BONUS_TEMPLATE[type].class}"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${count * 50}</td>`;
};
export default (stats) => {
  const screenCode = {
    get header() {
      return getHeader();
    },
    get content() {
      return `<div class="result">
      <h1>${(stats[0].lives > 0 ? `Победа!` : `Вы проиграли :( как же так?`)}</h1>
      ${stats.map((stat, i) => `<table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            ${getStats(stat.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${stat.answers.filter((it) => it.result > 0).length * 100}</td>
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`fast`, stat.answers.filter((it) => it.result > 0 && it.time < gameData.ANSWER_TIME.FAST).length)}
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`alive`, stat.lives)}
        </tr>
        <tr>
          <td></td>
          ${renderBonus(`slow`, stat.answers.filter((it) => it.result > 0 && it.time > gameData.ANSWER_TIME.SLOW).length * (-1))}
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${gameData.getResult(stat.answers, stat.lives)}</td>
        </tr>
      </table>`).join(``)}
    </div>`;
    },
    get footer() {
      return getFooter();
    }
  };


  return `${Object.entries(screenCode).map((it) => it[1]).join(``)}`;
};

