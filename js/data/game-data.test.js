import {assert} from 'chai';
import {getResult} from './game-data.js';

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

  });

  // it(`Lose game: `, () => {
  //   assert.equal(-1, getResult([[1, 15], [1, 15], [0, 15], [0, 15], [1, 15], [0, 15], [1, 15], [1, 15], [1, 15], [0, 15]], 0));
  //   assert.equal(-1, getResult([[1, 15], [1, 15], [0, 15], [0, 15], [1, 15], [0, 15], [1, 15], [-1, 15], [1, 15], [1, 15]], 0));
  // });

});


