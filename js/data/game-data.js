export const getResult = (answers, lifes) => {
  let result = 0;
  let countWrongs = 0;
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    if (answer[0] === 1) {
      result += 100;
      result += (answer[1] < 10 ? 50 : 0);
      result += (answer[1] > 20 ? -50 : 0);
    } else if (answer[0] === 0) {
      countWrongs++;
    } else if (answer[0] === -1) {
      return -1;
    }
  }
  if (countWrongs > 3) {
    return -1;
  }
  result += lifes * 50;

  return result;
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
