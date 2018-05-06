import FooterView from '../templates/footer-view';
import GreetingView from './greeting-view';

export default class GreetingScreen {
  constructor() {
    this._content = new GreetingView();
    this._content.onContinueClick = () => this.onContinueClick();
    this._root = document.createElement(`div`);
    this._root.appendChild(this._content.element);
    this._root.appendChild(new FooterView().element);
  }

  get element() {
    return this._root;
  }
}
