export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
});


export const answersTime = {
  FAST: 20,
  SLOW: 10
};

export const Result = {
  UNKNOWN: `unknown`,
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`
};

export const NextStep = {
  NOOP: 0,
  DIE: 1,
  WIN: 2,
  NEXT_LEVEL: 3
};

export const gameTypes = {
  ONE: `tinder-like`,
  TWO: `two-of-two`,
  OF_TREE: `one-of-three`
};

export const templateGames = {
  [gameTypes.ONE]: {
    'classForm': `game__content--wide`
  },
  [gameTypes.TWO]: {
    'classForm': ``
  },
  [gameTypes.OF_TREE]: {
    'classForm': `game__content--triple`
  }
};

export const checkAnswer = (game, answer) => {
  let result;
  switch (game.type) {
    case gameTypes.ONE:
      result = game.answers[0].type === answer[0];
      break;

    case gameTypes.TWO:
      result = game.answers[0].type === answer[0] && game.answers[1].type === answer[1];
      break;

    case gameTypes.OF_TREE:
      const set = new Set();
      game.answers.map((it) => (set.has(it.type) ? set.delete(it.type) : set.add(it.type)));
      result = set.has(answer[0]);
      break;
  }
  return result;
};

export const getResultType = (answer, time) => {
  if (answer === `undefined`) {
    return Result.UNKNOWN;
  } else {
    if (answer) {
      if (time > answersTime.FAST) {
        return Result.FAST;
      }
      if (time < answersTime.SLOW) {
        return Result.SLOW;
      }
      return Result.CORRECT;
    } else {
      return Result.WRONG;
    }
  }
};

export const getResult = (answers, lives) => {

  if (answers.length > answers.filter((it) => it).length) {
    return -1;
  }
  return 100 * answers.filter((it) => it !== Result.WRONG && it !== Result.UNKNOWN).length
    + 50 * (answers.filter((it) => it === Result.FAST).length
      + lives
      - answers.filter((it) => it === Result.SLOW).length);
};

export const tick = (game) => {
  const time = game.time - 1;

  return Object.assign({}, game, {
    time
  });
};
