import ErrorScreen from "./error/error-screen";
import Loader from './loader';
import IntroScreen from './intro/intro-screen';
import GreetingScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import GameModel from './data/game-model';
import GameScreen from './game/game-screen';
import StatsScreen from './stats/stats-screen';

const screen = document.querySelector(`.central`);

export const changeView = (element) => {
  screen.innerHTML = ``;
  screen.appendChild(element);
};

let gameData;

export default class Application {

  static async start() {
    const intro = new IntroScreen();
    intro.onContinueClick = (data) => Application.showGreeting(data);
    changeView(intro.element);
    try {
      Application.showGreeting(await Loader.loadData());
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
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.onBackClick = () => Application.showGreeting();
    rules.onSubmit = (player) => Application.showGame(player);
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
