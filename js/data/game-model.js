import {INITIAL_GAME,
  Result,
  checkAnswer,
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

  get stats() {
    return this._stats;
  }

  hasNextLevel() {
    return this._state.level < (this.data.length - 1);
  }

  restart() {
    this._state = INITIAL_GAME;
    this._stats = [];
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
    this._results[this._state.level] = {result, time: this._state.time};
  }

  saveStats(win) {
    this._stats.push(Object.assign({}, {win}, {lives: this._state.lives}, {answers: this._results}));
  }

  handlingAnswer(answer) {
    const result = checkAnswer(this.getLevel(), answer);
    this.addResult(result);
    if (!result) {
      this.die();
    }

    if (this.hasNextLevel()) {
      if (this.isDead()) {
        return Result.DIE;
      }
      this.nextLevel();
      return Result.NEXT_LEVEL;
    }
    return Result.WIN;
  }

  restartTimer() {
    this._state = Object.assign({}, this._state, {time: 30});
  }

  tick() {
    this._state = tick(this._state);
  }
}

