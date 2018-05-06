import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import StatsView from './stats-view';

export default class RulesScreen {
  constructor(data, playerName) {
    this._data = data;
    this._playerName = playerName;

    this._header = new HeaderView();
    this._header.onBackClick = () => this.onBackClick();
    this._content = new StatsView(this._data);
    this._content.onSubmit = this.onSubmit;

    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this._content.element);
    this._root.appendChild(new FooterView().element);
  }

  get element() {
    return this._root;
  }

  showStats(stats) {
    this._content.showStats(stats);
  }
}
