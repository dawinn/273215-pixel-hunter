import renderStatsBar from '../stats/statsbar-view';
import AbstractView from '../abstract-view';
import {GameTypes} from '../data/game-data';

export const TemplateGames = {
  [GameTypes.ONE]: {
    'classForm': `game__content--wide`
  },
  [GameTypes.TWO]: {
    'classForm': ``
  },
  [GameTypes.OF_TREE]: {
    'classForm': `game__content--triple`
  }
};

export default class LevelView extends AbstractView {
  constructor(data, stats) {
    super();
    this._type = data.type;
    this._question = data.question;
    this._answers = data.answers;
    this._stats = stats;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this._question}</p>
    <form class="game__content  ${TemplateGames[this._type].classForm}">
      ${this._answers.map((answer, i) => `
        <div class="game__option">
          <img src="${answer.image.url}" alt="Option ${i}" width="${answer.image.width}" height="${answer.image.height}">
          ${this._type !== GameTypes.OF_TREE ? `
            <label class="game__answer game__answer--photo">
              <input name="question${i}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="question${i}" type="radio" value="painting">
              <span>Рисунок</span>
            </label>` : ``}</div>`).join(``)}
    </form>
    <div class="stats">
      ${renderStatsBar(this._stats)}
    </div>
  </div>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const options = form.querySelectorAll(`.game__option`);

    switch (this._type) {
      case GameTypes.ONE:
        form.addEventListener(`click`, (evt) => {
          if (form.question0.value) {
            evt.preventDefault();
            this.onAnswer([form.question0.value]);
          }
        });
        break;

      case GameTypes.TWO:
        form.addEventListener(`click`, (evt) => {
          if (form.question0.value && form.question1.value) {
            evt.preventDefault();
            this.onAnswer([form.question0.value, form.question1.value]);
          }
        });
        break;

      case GameTypes.OF_TREE:
        [...options].map((option, i) => {
          option.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            this.onAnswer([this._answers[i].type]);
          });
        });
        break;
    }
  }
}

