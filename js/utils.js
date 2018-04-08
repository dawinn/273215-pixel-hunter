export const createElement = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer;
};

const screen = document.querySelector(`.central`);

export const showScreen = (element) => {
  screen.innerHTML = ``;
  screen.appendChild(element);
};
