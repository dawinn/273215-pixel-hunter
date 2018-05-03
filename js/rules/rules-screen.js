import Application from '../application';
import HeaderView from '../templates/header-view';
import FooterView from '../templates/footer-view';
import RulesView from './rules-view';

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView();
    this.header.onBackClick = this.goBack;

    this.content = new RulesView();
    this.content.onSubmit = this.submit;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);
  }

  get element() {
    return this.root;
  }

  submit(playerName) {
    Application.showGame(playerName);
  }

  goBack() {
    Application.showGreeting();
  }
}
