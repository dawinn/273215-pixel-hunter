import AbstractView from "../abstract-view";

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.bind();
  }

  get template() {
    return `<div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>`;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const submitBtn = form.querySelector(`.rules__button`);
    const playerName = form.querySelector(`.rules__input`);

    form.addEventListener(`submit`, this._onSubmitClick);

    this._onSubmitClick = (evt) => {
      evt.preventDefault();
      const player = playerName.value;
      playerName.value = ``;
      submitBtn.disabled = true;
      this.onSubmit(player);
    };

    playerName.addEventListener(`keyup`, () =>{
      submitBtn.disabled = !playerName.value;
    });
  }

  onSubmit() {

  }
}
