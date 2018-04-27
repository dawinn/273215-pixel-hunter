import {showScreen, createElement} from './utils.js';
import greetingView from './templates/greeting-view.js';
import rulesView from './templates/rules-view.js';
import statsView from './templates/stats-view.js';
import {initGame, playGame} from './data/game.js';

export const showGreeting = () => {
  const screen = createElement(greetingView);
  showScreen(screen);

  screen.querySelector(`.greeting__continue`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    showRules();
  });

};

export const showRules = () => {
  const screen = createElement(rulesView);
  showScreen(screen);

  const submit = screen.querySelector(`.rules__button`);
  const player = screen.querySelector(`.rules__input`);

  submit.addEventListener(`click`, (evt) =>{
    evt.preventDefault();

    showGame(player.value);
  });

  player.addEventListener(`keyup`, () =>{
    submit.disabled = !player.value;
  });

  const backButton = screen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    showGreeting();
  });
};

export const showGame = (playerName) => {
  const game = initGame(playerName);
  playGame(game);
};

export const showStats = (stats) => {
  const screen = createElement(statsView(stats));
  showScreen(screen);

  const backButton = screen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    showGreeting();
  });
};
