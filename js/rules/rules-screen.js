import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import RulesView from './rules-view';

export default class RulesScreen {
  constructor() {
    this._header = new HeaderView();
    this._header.onBackClick = () => this.onBackClick();

    this._content = new RulesView();
    this._content.onSubmit = (player) => this.onSubmit(player);

    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this._content.element);
    this._root.appendChild(new FooterView().element);
  }

  get element() {
    return this._root;
  }
}
