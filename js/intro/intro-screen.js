import FooterView from '../templates/footer-view';
import IntroView from './intro-view';

export default class IntroScreen {
  constructor() {
    this._content = new IntroView();

    this._root = document.createElement(`div`);
    this._root.classList.add(`crossfade`);
    this._root.appendChild(this._content.element);
    this._root.appendChild(new FooterView().element);
  }

  get element() {
    return this._root;
  }
}
