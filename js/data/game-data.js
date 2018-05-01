export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
});

export const answersTime = {
  FAST: 10,
  SLOW: 20,
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

export const LEVELS_GAME = [
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `http://placehold.it/468x458`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      },
      {
        "image": {
          "url": `http://placehold.it/468x458`,
          "width": 468,
          "height": 458
        },
        "type": `painting`
      }
    ]
  },
  {
    "type": `tinder-like`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `http://placehold.it/705x455`,
          "width": 705,
          "height": 455
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите рисунок среди изображений`,
    "answers": [
      {
        "image": {
          "url": `http://placehold.it/304x455`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      },
      {
        "image": {
          "url": `http://placehold.it/304x455`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://placehold.it/304x455`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите фото среди изображений`,
    "answers": [
      {
        "image": {
          "url": `http://placehold.it/304x455`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://placehold.it/304x455`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://placehold.it/304x455`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      }
    ]
  }
];

export const isSuccessAnswer = (game, answer) => {
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


export const canContinue = (game) => game.lives > 0 && game.level < game.data.length - 1;

export const getResult = (answers, lives) => {
  let result = 0;
  let countWrongs = 0;
  for (let i = 0; i < answers.length; i++) {
    const answer = (typeof answers[i] === Object ? Object.values(answers[i]) : answers[i]);
    if (answer[0] === 1) {
      result += 100;
      result += (answer[1] < answersTime.FAST ? 50 : 0);
      result += (answer[1] > answersTime.SLOW ? -50 : 0);
    } else if (answer[0] === 0) {
      countWrongs++;
    } else if (answer[0] === -1) {
      return -1;
    }
  }
  if (countWrongs > 3) {
    return -1;
  }
  return result + lives * 50;
};

export const getTimer = (timeSeconds) => {
  return {
    time: timeSeconds,
    tick() {
      if (this.time > 0) {
        return getTimer(this.time - 1);
      } else {
        return `timeout`;
      }
    }
  };
};

export const tick = (game) => {
  const time = game.time + 1;

  return Object.assign({}, game, {
    time
  });
};
