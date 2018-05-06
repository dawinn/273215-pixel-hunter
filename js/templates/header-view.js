import AbstractView from "../abstract-view";

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
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
   ${!this._state ? `` : `<h1 class="game__timer">${this._state.time}</h1>
    <div class="game__lives">
      ${drawHeart(this._state.lives > 2)}
      ${drawHeart(this._state.lives > 1)}
      ${drawHeart(this._state.lives > 0)}
    </div>`}
  </header>`;
  }

  set onBlink(blink = false) {
    this._blink.classList.toggle(`game__timer--blink`, blink);
  }

  bind() {
    this._backButton = this.element.querySelector(`.back`);
    this._backButton.addEventListener(`click`, this._onBackClick.bind(this));

    this._blink = this.element.querySelector(`.game__timer`);
  }

  _onBackClick(evt) {
    evt.preventDefault();
    this.unbind();
    this.onBackClick();
  }


  unbind() {
    this._backButton.removeEventListener(`click`, this._onBackClick);
  }


  onBackClick() {

  }
}
