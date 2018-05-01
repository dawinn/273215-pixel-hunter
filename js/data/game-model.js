import {INITIAL_GAME, LEVELS_GAME, Result, isSuccessAnswer, tick} from './game-data.js';

export default class GameModel {

  constructor(playerName) {
    this.data = LEVELS_GAME.slice();
    this.stats = Array();
    this.results = Array(this.data.length).fill().map(() => Object.assign({}, {result: -1, time: 15}));
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return this._state;
  }

  hasNextLevel() {
    return this._state.level < (this.data.length - 1);
  }

  restart() {
    this._state = INITIAL_GAME;
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
    this.results[this._state.level].result = result;
  }

  saveStats() {
    this.stats.unshift(Object.assign({}, {lives: this._state.lives}, {answers: this.results}));
  }

  handlingAnswer(answer) {
    const result = isSuccessAnswer(this.getLevel(), answer);
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

  tick() {
    this._state = tick(this._state);
  }
}

