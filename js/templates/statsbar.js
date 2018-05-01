import {answersTime} from '../data/game-data.js';

const STATS_TYPES = {
  UNKNOWN: `unknown`,
  WRONG: `wrong`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`
};

const getType = (it) => {
  if (it.result === -1) {
    return STATS_TYPES.UNKNOWN;
  }
  if (!it.result) {
    return STATS_TYPES.WRONG;
  } else if (it.time > 0 && it.time < answersTime.FAST) {
    return STATS_TYPES.FAST;
  } else if (it.time > answersTime.SLOW) {
    return STATS_TYPES.SLOW;
  }
  return STATS_TYPES.CORRECT;
};

export default (stats) => {
  if (stats === `empty`) {
    return `<ul class="stats">${`<li class="stats__result stats__result--${STATS_TYPES.UNKNOWN}"></li>`.repeat(10)}</ul>`;
  } else {
    return `<ul class="stats">${stats.map((it) => `<li class="stats__result stats__result--${getType(it)}"></li>`).join(``)
    }</ul>`;
  }
};


