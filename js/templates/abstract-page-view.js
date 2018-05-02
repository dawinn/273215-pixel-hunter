import AbstractView from "../abstract-view";
import HeaderView from './header-view.js';
import FooterView from './footer-view.js';
// import Application from '../application';

export default class AbstractPage extends AbstractView {
  constructor() {
    super();
    this._header = new HeaderView();
  }

  get header() {
    return this._header.template;
  }

  get content() {
    return ` <div>Привет! Я контент!</div>`;
  }

  get footer() {
    return new FooterView().template;
  }

  get template() {
    return `${this.header}
    ${this.content}
    ${this.footer}`;
  }

  bind() {

  }


}
