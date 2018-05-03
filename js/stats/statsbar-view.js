import {answersTime} from '../data/game-data';

const STATS_TYPES = {
  UNKNOWN: `unknown`,
  WRONG: `wrong`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`
};

const getType = (stat) => {
  if (!stat) {
    return STATS_TYPES.UNKNOWN;
  }
  if (!stat.result) {
    return STATS_TYPES.WRONG;
  } else if (stat.time > answersTime.FAST) {
    return STATS_TYPES.FAST;
  } else if (stat.time < answersTime.SLOW && stat.time > 0) {
    return STATS_TYPES.SLOW;
  }
  return STATS_TYPES.CORRECT;
};

export default (stats) => {
  let barLine = [];
  for (let i = 0; i < stats.length; i++) {
    barLine.push(`<li class="stats__result stats__result--${getType(stats[i])}"></li>`);
  }
  return `<ul class="stats">${barLine.join(``)}</ul>`;
};


