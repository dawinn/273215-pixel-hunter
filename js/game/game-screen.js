import {NextStep} from '../data/game-data';
import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import LevelView from './level-view';
import ConfirmView from '../templates/confirm-view';

const ABIT_TIME = 5;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this._header = new HeaderView(this.model.state);
    this.content = new LevelView(this.model.getLevel(), this.model.results);

    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this.content.element);
    this._root.appendChild(new FooterView().element);

    this._interval = null;
  }

  get element() {
    return this._root;
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
      this.updateHeader();
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

  updateHeader() {
    const header = new HeaderView(this.model.state);
    header.onBackClick = () => this.onConfirmBack();
    this._root.replaceChild(header.element, this._header.element);

    this._header = header;
    this._header.onBlink = this.model.state.time < ABIT_TIME;
  }

  changeLevel() {
    this.updateHeader();

    const level = new LevelView(this.model.getLevel(), this.model.results);
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
  }

  changeContentView(view) {
    this._root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  endGame(win) {
    this.showStats(this.model.getStats(win));
  }

  onConfirmBack() {
    this.stopGame();
    this._popup = new ConfirmView();

    this._root.appendChild(this._popup.element);
    this._popup.onSubmitClick = () => this.onBackClick();
    this._popup.onCancelClick = () => this._onCancelClick();

    this._onCancelClick = () => {
      this._root.removeChild(this._popup.element);
      this.startGame();
    };
  }
}
