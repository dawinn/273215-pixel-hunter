import {NextStep} from '../data/game-data';
import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import LevelView from './level-view';

import Application from '../application';

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
    let blink = false;
    this.changeLevel();
    this.model.restartTimer();

    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time < ABIT_TIME) {
        blink = true;
      }

      if (this.model.state.time <= 0) {
        this.answer();
      }
      this.updateHeader(blink);
    }, 1000);

  }

  answer(answer) {
    this.stopGame();

    switch (this.model.onAnswer(answer)) {
      case NextStep.NEXT_LEVEL:
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
    if (blink) {
      this.header.onBlink();
    }
    this.root.replaceChild(header.element, this.header.element);

    header.onBackClick = this.goBack.bind(this);
    this.header = header;
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
    Application.showStats(this.model.getStats(win));
  }

  goBack() {
    Application.showGreeting();
  }
}

