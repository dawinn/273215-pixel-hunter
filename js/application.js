import GameModel from './data/game-model';
import GreetingScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './stats/stats-screen';

const screen = document.querySelector(`.central`);
export const changeView = (element) => {
  screen.innerHTML = ``;
  screen.appendChild(element);
};

export default class Application {
  static start() {
    this.showGreeting();
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statsPage = new StatsScreen(stats);
    changeView(statsPage.element);
  }

}
