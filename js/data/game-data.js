export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
});

export const BONUS_POINTS = 50;
export const ANSWER_POINTS = 100;
const RESULT_FAIL = -1;

export const AnswersTime = {
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

export const GameTypes = {
  ONE: `tinder-like`,
  TWO: `two-of-two`,
  OF_TREE: `one-of-three`
};

export const checkAnswer = (game, answer) => {
  let result;
  switch (game.type) {
    case GameTypes.ONE:
      result = game.answers[0].type === answer[0];
      break;

    case GameTypes.TWO:
      result = game.answers[0].type === answer[0] && game.answers[1].type === answer[1];
      break;

    case GameTypes.OF_TREE:
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
  }

  if (answer) {
    if (time > AnswersTime.FAST) {
      return Result.FAST;
    }

    if (time < AnswersTime.SLOW) {
      return Result.SLOW;
    }

    return Result.CORRECT;
  }

  return Result.WRONG;
};

export const getResult = (answers, lives) => {

  if (answers.length > answers.filter((it) => it).length) {
    return RESULT_FAIL;
  }
  return ANSWER_POINTS * answers.filter((it) => it !== Result.WRONG && it !== Result.UNKNOWN).length
    + BONUS_POINTS * (answers.filter((it) => it === Result.FAST).length
      + lives
      - answers.filter((it) => it === Result.SLOW).length);
};

export const tick = (game) => {
  const time = game.time - 1;

  return Object.assign({}, game, {
    time
  });
};
