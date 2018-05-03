export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
});


export const answersTime = {
  FAST: 20,
  SLOW: 10,
  ABIT: 5
};

export const answersTypes = {
  NONE: -1,
  FAIL: 0,
  LUCK: 1
};

export const Result = {
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

export const getResult = (answers, lives) => {
  let result = 0;
  let countWrongs = 0;
  for (let i = 0; i < answers.length; i++) {
    let answer = (typeof answers[i] === `object` ? Object.values(answers[i]) : answers[i]);
    if (answer[0]) {
      result += 100;
      result += (answer[1] > answersTime.FAST ? 50 : 0);
      result += (answer[1] < answersTime.SLOW ? -50 : 0);
    } else if (answer.result) {
      countWrongs++;
    } else if (answer[0] === -1) {
      return -1;
    }
  }
  if (countWrongs > 3) {
    return -1;
  }
  return result + (lives > 0 ? lives * 50 : 0);
};

export const getTimer = (timeSeconds) => {
  return {
    time: timeSeconds,
    tick() {
      if (this.time > 0) {
        return getTimer(this.time + 1);
      } else {
        return `timeout`;
      }
    }
  };
};

export const tick = (game) => {
  const time = game.time - 1;

  return Object.assign({}, game, {
    time
  });
};
