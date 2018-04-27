export const INITIAL_STATE = {
  level: 0,
  lives: 3,
  time: 30,
};

export const ANSWER_TIME = {
  FAST: 10,
  SLOW: 20,
  ABIT: 5
};

export const ANSWER_TYPES = {
  none: -1,
  incorrect: 0,
  correct: 1
};

export const IMAGE_TYPES = {'paint': `картинка`, 'photo': `фото`};
export const STATS_TYPES = [`unknown`, `wrong`, `correct`, `fast`, `slow`];
export const stats = [];

export const IMAGES = {
  [Object.keys(IMAGE_TYPES)[0]]: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  [Object.keys(IMAGE_TYPES)[1]]: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const getResult = (answers, lives) => {
  let result = 0;
  let countWrongs = 0;
  for (let i = 0; i < answers.length; i++) {
    const answer = Object.values(answers[i]);
    if (answer[0] === 1) {
      result += 100;
      result += (answer[1] < ANSWER_TIME.FAST ? 50 : 0);
      result += (answer[1] > ANSWER_TIME.SLOW ? -50 : 0);
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

export const getImage = (quantity = 1) => {
  const images = [];
  for (let i = 0; i < quantity; i++) {
    const image = {
      type: Object.keys(IMAGE_TYPES)[Math.floor(Math.random() * Object.keys(IMAGE_TYPES).length)]
    };
    Object.assign(image, {url: IMAGES[image.type][Math.floor(Math.random() * IMAGES[image.type].length)]});
    images[i] = image;
  }
  return images;
};
