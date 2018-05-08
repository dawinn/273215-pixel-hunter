import ErrorScreen from "./error/error-screen";
import Loader, {preCacheAssets} from './loader';
import IntroScreen from './intro/intro-screen';
import GreetingScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import GameModel from './data/game-model';
import GameScreen from './game/game-screen';
import StatsScreen from './stats/stats-screen';

const TIME_CROSSFADE_EFFECT = 5000;
const screen = document.querySelector(`.central`);

export const changeView = (element) => {
  screen.innerHTML = ``;
  screen.appendChild(element);
};


export const changeViewCrossfade = (element) => {
  screen.appendChild(element);
  element.classList.add(`central--blur`);
  const oldElement = screen.querySelector(`.crossfade`);
  oldElement.classList.add(`crossfade--off`);
  setTimeout(() => screen.querySelector(`.crossfade`) && screen.removeChild(oldElement), TIME_CROSSFADE_EFFECT);
};

let gameData;

export default class Application {

  static async start() {
    const intro = new IntroScreen();
    changeView(intro.element);
    try {
      let data = await Loader.loadData();
      Promise.all(preCacheAssets(data))
          .then(() => Application.showGreeting(data));
    } catch (e) {
      Application.showError(e);
    }
  }

  static showGreeting(data) {
    if (!gameData) {
      gameData = data;
    }

    const greeting = new GreetingScreen();
    greeting.onContinueClick = () => Application.showRules();
    if (!data) {
      changeView(greeting.element);
    } else {
      changeViewCrossfade(greeting.element);
    }
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.onBackClick = () => Application.showGreeting();
    rules.onSubmitClick = (player) => Application.showGame(player);
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(gameData, playerName));
    gameScreen.onBackClick = () => Application.showGreeting();
    gameScreen.showStats = (stats) => Application.showStats(stats);
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static async showStats(stats) {
    const playerName = stats.playerName;
    const statsPage = new StatsScreen(stats, playerName);
    changeView(statsPage.element);
    statsPage.onBackClick = () => Application.showGame(playerName);

    try {
      await Loader.saveResults(stats, playerName);
      statsPage.showStats(await Loader.loadResults(playerName));
    } catch (e) {
      Application.showError(e);
    }
  }

  static showError(error) {
    const errorView = new ErrorScreen(error);
    changeView(errorView.element);
  }
}
