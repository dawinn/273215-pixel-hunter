import renderStatsBar from '../stats/statsbar-view';
import AbstractView from '../abstract-view';
import {gameTypes, templateGames} from '../data/game-data';


export default class LevelView extends AbstractView {
  constructor(data, _stats) {
    super();
    this.type = data.type;
    this.question = data.question;
    this.answers = data.answers;
    this._stats = _stats;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this.question}</p>
    <form class="game__content  ${templateGames[this.type].classForm}">
      ${this.answers.map((answer, i) => `
        <div class="game__option ">
          <img src="${answer.image.url}" alt="Option ${i}" width="${answer.image.width}" height="${answer.image.height}">
          ${this.type !== gameTypes.OF_TREE ? `
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

    switch (this.type) {
      case gameTypes.ONE:
        form.addEventListener(`click`, (evt) => {
          if (form.question0.value) {
            evt.preventDefault();
            this.onAnswer([form.question0.value]);
          }
        });
        break;

      case gameTypes.TWO:
        form.addEventListener(`click`, (evt) => {
          if (form.question0.value && form.question1.value) {
            evt.preventDefault();
            this.onAnswer([form.question0.value, form.question1.value]);
          }
        });
        break;

      case gameTypes.OF_TREE:
        [...options].map((option, i) => {
          option.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            this.onAnswer([this.answers[i].type]);
          }, false);
        });
        break;
    }
  }

  onAnswer() {

  }
}

