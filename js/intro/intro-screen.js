import FooterView from '../templates/footer-view';
import IntroView from './intro-view';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.content.onContinueClick = () => this.goContinue();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);
  }

  get element() {
    return this.root;
  }

  goContinue() {

  }
}
