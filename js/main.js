(function () {
  const keyCode = {
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37
  };

  const ScreenController = {
    currentScreen: 0,
    templates: [],

    constructor() {
      this.templates = document.querySelectorAll(`template`);
    },

    show() {
      document.getElementsByClassName(`central`)[0].innerHTML = this.templates[this.currentScreen].innerHTML;
    },

    getNext() {
      if (this.currentScreen > 0) {
        this.currentScreen--;
        this.show();
      }
    },

    getPrev() {
      if (this.currentScreen < this.templates.length - 1) {
        this.currentScreen++;
        this.show();
      }
    }
  };

  ScreenController.constructor();
  ScreenController.show();
  document.addEventListener(`keydown`, (evt) => {
    if (evt.altKey) {
      if (evt.keyCode === keyCode.LEFT_ARROW) {
        ScreenController.getNext();
      }
      if (evt.keyCode === keyCode.RIGHT_ARROW) {
        ScreenController.getPrev();
      }
    }
  });

})();
