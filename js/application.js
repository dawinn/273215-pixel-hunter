import HeaderView from './templates/header-view';
import GreetingView from './templates/greeting-view';
import RulesView from './templates/rules-view';
import StatsView from './templates/stats-view';
import GameModel from './data/game-model';
import GameScreen from './templates/game-screen.js';


const screen = document.querySelector(`.central`);
export const showScreen = (elements) => {
  screen.innerHTML = ``;
  for (const element of elements) {
    screen.appendChild(element);
  }
};

export default class Application {

  static showGreeting() {
    const greeting = new GreetingView();
    greeting.onContinueClick = () => Application.showRules();
    showScreen([greeting.element]);
  }

  static showRules() {
    const header = new HeaderView();
    const rules = new RulesView();
    header.onBackButtonClick = () => Application.showGreeting();
    rules.onSubmit = (data) => Application.showGame(data);

    showScreen([header.element, rules.element]);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    showScreen([gameScreen.element]);
    gameScreen.startGame();
  }

  static showStats(win, stats) {
    const header = new HeaderView();
    const statsPage = new StatsView(win, stats);
    header.onBackButtonClick = () => Application.showGreeting();
    showScreen([header.element, statsPage.element]);
  }

}
