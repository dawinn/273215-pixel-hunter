import Application from '../application';
import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import StatsView from './stats-view';

export default class RulesScreen {
  constructor(data) {
    this._data = data;
    this.header = new HeaderView();
    this.header.onBackClick = this.goBack.bind(this);
    this.content = new StatsView(this._data.stats);
    this.content.onSubmit = this.submit;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);
  }

  get element() {
    return this.root;
  }

  goBack() {
    Application.showGame(this._data.playerName);
  }
}
