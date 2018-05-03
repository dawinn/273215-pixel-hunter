import Application from '../application';
import FooterView from '../templates/footer-view';
import GreetingView from './greeting-view';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.content.onContinueClick = this.goContinue;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);
  }

  get element() {
    return this.root;
  }

  goContinue() {
    Application.showRules();
  }
}
