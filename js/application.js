import GameModel from './data/game-model';
import ErrorScreen from "./error/error-screen";
import Loader from "./loader";
import GreetingScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './stats/stats-screen';

const screen = document.querySelector(`.central`);
export const changeView = (element) => {
  screen.innerHTML = ``;
  screen.appendChild(element);
};

let gameData;
export default class Application {
  static start() {
    Loader.loadData().
        then(Application.showGreeting).
        catch(Application.showError);

  }

  static showGreeting(data) {
    gameData = data;
    const greeting = new GreetingScreen();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(gameData, playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statsPage = new StatsScreen(stats);
    changeView(statsPage.element);
  }

  static showError(error) {
    const errorView = new ErrorScreen(error);
    changeView(errorView.element);
  }
}
