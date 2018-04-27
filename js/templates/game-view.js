import {getStats} from './stats-view.js';

const templateGames = {
  'images-1': {
    'classForm': `game__content--wide`,
    task() {
      return `Угадай, фото или рисунок?`;
    },
    optionTemplate(source, i) {
      return `<img src="${source}" alt="Option ${i}" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input name="question${i}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question${i}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>`;
    }
  },
  'images-2': {
    'classForm': ``,
    task() {
      return `Угадайте для каждого изображения фото или рисунок?`;
    },
    optionTemplate(source, i) {
      return `<img src="${source}" alt="Option ${i}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${i}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>`;
    }
  },
  'images-3': {
    'classForm': `game__content--triple`,
    task() {
      return `Найдите рисунок среди изображений`;
    },
    optionTemplate(source, i) {
      return `<img src="${source}" alt="Option ${i}" width="304" height="455">`;
    }
  }
};

export const getScreenGame = (images, answers) => {
  const gameType = images.length;
  return `<div class="game">
    <p class="game__task">${templateGames[`images-${gameType}`].task()}</p>
    <form class="game__content  ${templateGames[`images-${gameType}`].classForm}">
      ${images.map((image, i) => `<div class="game__option ">${templateGames[`images-${gameType}`].optionTemplate(image.url, i)}</div>`).join(``)}
    </form>
    <div class="stats">
      ${getStats(answers)}
    </div>
  </div>`;
};
