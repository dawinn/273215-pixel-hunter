import {showScreen} from './utils.js';
import greeting from './greeting.js';

const asteriskLink = document.querySelector(`.intro__asterisk`);
asteriskLink.addEventListener(`click`, () => {
  showScreen(greeting);
});
