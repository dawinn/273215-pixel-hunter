import {NextStep} from '../data/game-data';
import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import LevelView from './level-view';

const ABIT_TIME = 5;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new LevelView(this.model.getLevel(), this.model.results);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);

    this._interval = null;
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startGame() {
    this.changeLevel();

    this._interval = setInterval(() => {
      this.model.tick();

      if (this.model.state.time <= 0) {
        this.answer();
      }
      this.updateHeader(this.model.state.time < ABIT_TIME);
    }, 1000);

  }

  answer(answer) {
    this.stopGame();

    switch (this.model.onAnswer(answer)) {
      case NextStep.NEXT_LEVEL:
        this.model.restartTimer();
        this.startGame();
        break;
      case NextStep.DIE:
        this.endGame(false);
        break;
      case NextStep.WIN:
        this.endGame(true);
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  }

  updateHeader(blink) {
    const header = new HeaderView(this.model.state);

    this.root.replaceChild(header.element, this.header.element);

    header.onBackClick = () => this.onConfirm();
    this.header = header;
    if (blink) {
      this.header.onBlink();
    }
  }


  changeLevel() {
    this.updateHeader();

    const level = new LevelView(this.model.getLevel(), this.model.results);
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  endGame(win) {
    this.showStats(this.model.getStats(win));
  }

  onConfirm() {
    this.stopGame();
    const popup = document.createElement(`div`);
    popup.classList.add(`confirm__overlay`);
    popup.innerHTML = `
      <form class="confirm__form">
        <div class="confirm__message">Вы хотите вернуться? Все результаты текущей игры будут потеряны</div>
        <div class="confirm__buttons">
          <input class="confirm__button  confirm__button--submit" type="submit" value="Ок">
          <input class="confirm__button  confirm__button--cansel" type="button" name="cancel" value="Отмена">
        </div>
      </form>
      `;
    this.root.appendChild(popup);

    const popupForm = this.root.querySelector(`.confirm__form`);
    popupForm.addEventListener(`submit`, this.goBack);
    popupForm.cancel.addEventListener(`click`, () => {
      this.root.removeChild(popup);
      this.startGame();
    });

  }

  goBack() {

  }

  showStats() {

  }
}

