const drawHeart = (full) => {
  return `<img src="img/heart__${full ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};


export const getHeader = (state = `nogame`) => `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
   ${state === `nogame` ? `` : `<h1 class="game__timer">${state.time}</h1>
    <div class="game__lives">
      ${drawHeart(state.lives > 2)}
      ${drawHeart(state.lives > 1)}
      ${drawHeart(state.lives > 0)}
    </div>`}
  </header>`;

