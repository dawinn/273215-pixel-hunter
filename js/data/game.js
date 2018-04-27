import {getImage, INITIAL_STATE, ANSWER_TYPES, stats} from './game-data.js';
import {createElement} from '../utils.js';
import * as applications from '../application.js';
import {getHeader} from '../templates/header-view.js';
import {getScreenGame} from '../templates/game-view.js';
import {getFooter} from '../templates/footer-view.js';

const INITIAL_GAME = {
  LEVELS_COUNT: 10,
  MAX_IMAGES_TO_LEVEL: 3
};

export const initGame = (playerName) => {
  const answers = new Array(INITIAL_GAME.LEVELS_COUNT).fill().map(() => Object.assign({}, {result: ANSWER_TYPES[`none`], time: 0}));
  const levels = Array(INITIAL_GAME.LEVELS_COUNT).fill().map(() => getImage(Math.floor(Math.random() * INITIAL_GAME.MAX_IMAGES_TO_LEVEL) + 1));
  return Object.assign({}, {name: playerName}, INITIAL_STATE, {levels}, {answers});
};

const screen = document.querySelector(`.central`);

export const playGame = (game) => {
  screen.innerHTML = ``;
  screen.appendChild(createElement(`${getHeader(game)}${getScreenGame(game.levels[game.level], game.answers)}${getFooter()}`));

  const form = screen.querySelector(`.game__content`);
  const options = form.querySelectorAll(`.game__option`);

  if (game.levels[game.level].length === 1) {
    form.addEventListener(`click`, () => {
      if (form.question0.value) {
        game.answers[game.level].result = (form.question0.value === game.levels[game.level][0].type ? 1 : 0);
        nextLevel(game);
      }
    });
  } else if (game.levels[game.level].length === 2) {
    form.addEventListener(`click`, () => {
      if (form.question0.value && form.question1.value) {
        game.answers[game.level].result = (form.question0.value === game.levels[game.level][0].type && form.question1.value === game.levels[game.level][1].type ? 1 : 0);
        nextLevel(game);
      }
    });
  } else {
    [...options].map(function (option) {
      option.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        let selElement = form.firstElementChild;
        let i = 0;
        while (selElement) {
          if (evt.target === selElement) {
            game.answers[game.level].result = (game.levels[game.level][i].type === `paint` ? 1 : 0);
            nextLevel(game);
            break;
          }
          selElement = selElement.nextElementSibling;
          i++;
        }
      });
    });
  }

  const backButton = screen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    applications.showGreeting();
  });

};

const nextLevel = (game) => {
  if (game.level < INITIAL_GAME.LEVELS_COUNT - 1 && game.lives > 0) {
    playGame(Object.assign({}, game, {level: game.level + 1}, {lives: game.lives - (game.answers[game.level].result ? 0 : 1)}));
  } else {
    stats.unshift(Object.assign({}, {lives: game.lives}, {answers: game.answers}));
    applications.showStats(stats);
  }
};

