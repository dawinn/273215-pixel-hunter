(function () {
  const keyCode = {
    ALT: 18,
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37
  };
  const templateLinks = [];
  let currentScreen = 0;

  const templates = document.querySelectorAll(`template`);
  templateLinks[0] = document.querySelector(`main.central`);
  for (let i = 0; i < templates.length; i++) {
    templateLinks[i + 1] = templates[i];
  }

  const removeChildren = function (elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  };

  const showScreen = function (num) {
    let mainScreen = templateLinks[0];
    removeChildren(mainScreen);
    mainScreen.appendChild(templateLinks[num].content.cloneNode(true));
  };

  const shiftScreen = function (step) {
    currentScreen += step;
    currentScreen = (step < 0 ? Math.max(currentScreen, 1) : currentScreen);
    currentScreen = (step > 0 ? Math.min(currentScreen, templateLinks.length - 1) : currentScreen);
    showScreen(currentScreen);
  };

  const pressedKeys = {};

  const pressedAltArrow = function (keys) {
    if (keys[keyCode.LEFT_ARROW]) {
      shiftScreen(-1);
    }
    if (keys[keyCode.RIGHT_ARROW]) {
      shiftScreen(1);
    }
    showScreen(currentScreen);
  };

  const onKeyDown = function (evtDown) {
    pressedKeys[evtDown.keyCode] = true;
    if (!pressedKeys[keyCode.ALT] || !(pressedKeys[keyCode.LEFT_ARROW] || pressedKeys[keyCode.RIGHT_ARROW])) {
      return;
    }

    pressedAltArrow(pressedKeys);
  };

  showScreen(currentScreen + 1);
  document.addEventListener(`keydown`, onKeyDown);

  document.addEventListener(`keyup`, function (evtUp) {
    delete pressedKeys[evtUp.keyCode];
  });
})();
