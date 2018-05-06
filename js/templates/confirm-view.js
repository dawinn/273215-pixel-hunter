import AbstractView from "../abstract-view";

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
    this.bind();
  }
  get template() {
    return `
      <form class="confirm__form">
        <div class="confirm__message">Вы хотите вернуться? Все результаты текущей игры будут потеряны</div>
        <div class="confirm__buttons">
          <input class="confirm__button  confirm__button--submit" type="submit" name="submit" value="Ок">
          <input class="confirm__button  confirm__button--cancel" type="button" name="cancel" value="Отмена">
        </div>
      </form>`;
  }

  bind() {
    this.element.classList.add(`confirm__overlay`);
    this._popupForm = this.element.querySelector(`.confirm__form`);

    this._popupForm.addEventListener(`submit`, this._onSubmitClick);
    this._onSubmitClick = (evt) => {
      evt.preventDefault();
      this.unbind();
      this.onSubmitClick();
    };
    this._popupForm.cancel.addEventListener(`click`, this._onCancelClick);
    this._onCancelClick = (evt) => {
      evt.preventDefault();
      this.unbind();
      this.onCancelClick();
    };
  }

  unbind() {
    this._popupForm.removeEventListener(`submit`, this._onSubmitClick);
    this._popupForm.cancel.removeEventListener(`click`, this.onCancelClick);
  }


  onSubmitClick() {

  }

  onCancelClick() {

  }
}
