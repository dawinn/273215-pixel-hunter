import {showScreen} from './utils.js';
import greeting from './greeting.js';


export default function backToGreeting(screen) {
  const backButton = screen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    showScreen(greeting);
  });
}

