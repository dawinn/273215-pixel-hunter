import {INITIAL_GAME,
  NextStep,
  checkAnswer,
  getResultType,
  tick} from './game-data.js';

export default class GameModel {

  constructor(gameData, playerName) {
    this.data = gameData.slice();
    this.playerName = playerName;

    this.restart();
  }

  get state() {
    return this._state;
  }

  get results() {
    return this._results;
  }

  hasNextLevel() {
    return this._state.level < (this.data.length - 1);
  }

  restart() {
    this._state = INITIAL_GAME;
    this._results = Array(this.data.length);
  }

  die() {
    this._state = Object.assign({}, this._state, {lives: this._state.lives - 1});
  }

  isDead() {
    return this._state.lives <= 0;
  }

  nextLevel() {
    this._state = Object.assign({}, this._state, {level: this._state.level + 1});
  }

  getLevel() {
    return this.data[this._state.level];
  }

  addResult(result) {
    this._results[this._state.level] = result;
  }

  getStats(win) {
    return (Object.assign({}, {playerName: this.playerName, win, lives: this._state.lives}, {answers: this._results}));
  }

  onAnswer(answer) {

    const result = (answer ? checkAnswer(this.getLevel(), answer) : false);
    this.addResult(getResultType(result, this._state.time));

    if (!result) {
      this.die();
    }
    if (this.isDead()) {
      return NextStep.DIE;
    }
    if (this.hasNextLevel()) {
      this.nextLevel();
      return NextStep.NEXT_LEVEL;
    }
    return NextStep.WIN;
  }

  restartTimer() {
    this._state = Object.assign({}, this._state, {time: 30});
  }

  tick() {
    this._state = tick(this._state);
  }
}

