import AbstractView from "../abstract-view";

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
   ${!this.state ? `` : `<h1 class="game__timer">${this.state.time}</h1>
    <div class="game__lives">
      ${drawHeart(this.state.lives > 2)}
      ${drawHeart(this.state.lives > 1)}
      ${drawHeart(this.state.lives > 0)}
    </div>`}
  </header>`;
  }

  bind(element) {
    element.querySelector(`.back`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackClick();
    });
  }

  onBackClick() {

  }
}
