import {assert} from 'chai';
import {getResult, getTimer} from './game-data.js';

// describe(`Array`, () => {
//   describe(`#indexOf()`, () => {
//     it(`should return -1 when the value is not present`, () => {
//       assert.equal(-1, [1, 2, 3].indexOf(4));
//     });
//   });
// });

describe(`Calculate game's result`, () => {
  it(`Should get win`, () => {
    assert.equal(1150, getResult([[1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15]], 3));
    assert.equal(1150, getResult([[1, 15], [1, 9], [1, 15], [1, 22], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15]], 3));
    assert.equal(1050, getResult([[1, 15], [1, 9], [1, 15], [1, 22], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15], [1, 15]], 1));
    assert.equal(500, getResult([[1, 25], [1, 25], [1, 25], [1, 29], [1, 21], [1, 22], [1, 22], [1, 22], [1, 22], [1, 22]], 0));

  });

  it(`Lose game: `, () => {
    assert.equal(-1, getResult([[1, 15], [1, 15], [0, 15], [0, 15], [1, 15], [0, 15], [1, 15], [1, 15], [1, 15], [0, 15]], 0));
    assert.equal(-1, getResult([[1, 15], [1, 15], [0, 15], [0, 15], [1, 15], [0, 15], [1, 15], [-1, 15], [1, 15], [1, 15]], 0));
  });

  it(`Lose game, less 10 answers: `, () => {
    assert.equal(-1, getResult([[-1, 30], [-1, 30], [0, 15], [0, 15], [-1, 30], [0, 15], [1, 15], [1, 15], [1, 15], [0, 15]], 0));
    assert.equal(-1, getResult([[-1, 30], [1, 29], [0, 15], [0, 15], [1, 29], [0, 15], [1, 15], [1, 15], [1, 15], [0, 15]], 0));
  });
});

describe(`Testing timer`, () => {
  it(`Set timer`, () => {
    assert.equal(getTimer(10).time, 10);
  });

  it(`Call tick`, () => {
    assert.equal(getTimer(30).tick().time, 29);
    assert.equal(getTimer(30).tick().tick().time, 28);
  });

  it(`End timer`, () => {
    assert.notEqual(getTimer(1).tick(), `timeout`);
    assert.equal(getTimer(1).tick().tick(), `timeout`);
  });
});
