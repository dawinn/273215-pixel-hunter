import {Result} from '../data/game-data.js';
import HeaderView from './header-view.js';
import FooterView from './footer-view.js';
import LevelView from './level-view.js';

import Application from '../application';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new LevelView(this.model.getLevel(), this.model.results);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);

  }

  get element() {
    return this.root;
  }

  stopGame() {

  }

  startGame() {
    this.changeLevel();
  }

  answer(answer) {
    this.stopGame();

    switch (this.model.handlingAnswer(answer)) {
      case Result.NEXT_LEVEL:
        this.startGame();
        break;
      case Result.DIE:
        this.endGame(false);
        break;
      case Result.WIN:
        this.endGame(true);
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    header.onBackButtonClick = this.onBackButtonClick.bind(this);
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
    this.model.saveStats();
    Application.showStats(win, this.model.stats);
  }

  onBackButtonClick() {
    Application.showGreeting();
  }
}

