export default (stats) => {
  let barLine = [];
  for (let i = 0; i < stats.length; i++) {
    barLine.push(`<li class="stats__result stats__result--${stats[i] ? stats[i] : `unknown`}"></li>`);
  }
  return `<ul class="stats">${barLine.join(``)}</ul>`;
};


