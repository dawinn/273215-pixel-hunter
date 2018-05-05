import {assert} from 'chai';
import {checkAnswer,
  getResultType,
  getResult} from './game-data';

describe(`For game-data`, () => {
  describe(`Test function checkAnswer(game, answer):`, () => {
    it(`1. should return true`, () => {
      assert.equal(true, checkAnswer({type: `tinder-like`, answers: [{type: `paiting`}]}, [`paiting`]));
    });
    it(`2. should return true`, () => {
      assert.equal(true, checkAnswer({type: `tinder-like`, answers: [{type: `photo`}]}, [`photo`]));
    });
    it(`3. should return true`, () => {
      assert.equal(true, checkAnswer({type: `one-of-three`, answers: [{type: `painting`}, {type: `painting`}, {type: `photo`}]}, [`photo`]));
    });
    it(`4. should return true`, () => {
      assert.equal(true, checkAnswer({type: `one-of-three`, answers: [{type: `painting`}, {type: `photo`}, {type: `photo`}]}, [`painting`]));
    });
    it(`5. should return true`, () => {
      assert.equal(true, checkAnswer({type: `two-of-two`, answers: [{type: `photo`}, {type: `photo`}]}, [`photo`, `photo`]));
    });
    it(`6. should return true`, () => {
      assert.equal(true, checkAnswer({type: `two-of-two`, answers: [{type: `photo`}, {type: `painting`}]}, [`photo`, `painting`]));
    });

    it(`should return false`, () => {
      assert.equal(false, checkAnswer({type: `tinder-like`, answers: [{type: `paiting`}]}, `photo`));
      assert.equal(false, checkAnswer({type: `tinder-like`, answers: [{type: `photo`}]}, `paiting`));
      assert.equal(false, checkAnswer({type: `one-of-three`, answers: [{type: `painting`}, {type: `painting`}, {type: `photo`}]}, `paiting`));
      assert.equal(false, checkAnswer({type: `one-of-three`, answers: [{type: `painting`}, {type: `photo`}, {type: `photo`}]}, `photo`));
      assert.equal(false, checkAnswer({type: `two-of-two`, answers: [{type: `photo`}, {type: `photo`}]}, [`photo`, `painting`]));
      assert.equal(false, checkAnswer({type: `two-of-two`, answers: [{type: `photo`}, {type: `painting`}]}, [`painting`, `photo`]));
    });
  });

  describe(`Test function getResultType(answer, time):`, () => {
    it(`should return type of answer: fast, slow, correct, wrong: `, () => {
      assert.equal(`correct`, getResultType(true, 15));
      assert.equal(`fast`, getResultType(true, 21));
      assert.equal(`slow`, getResultType(true, 9));
      assert.equal(`wrong`, getResultType(false, 15));
    });
  });

  describe(`Test function getResult(answers, lives):`, () => {
    it(`should return -1: `, () => {
      assert.equal(-1, getResult([`fast`, `fast`, `fast`, `fast`, `fast`, `wrong`, `fast`, `wrong`, `wrong`, null], 0));
    });
    it(`should return totalResult 1150: `, () => {
      assert.equal(1150, getResult([`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`], 3));
    });
    it(`should return totalResult 1650: `, () => {
      assert.equal(1650, getResult([`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`], 3));
    });
    it(`should return totalResult 1150: `, () => {
      assert.equal(1150, getResult([`fast`, `fast`, `fast`, `slow`, `fast`, `fast`, `fast`, `wrong`, `wrong`, `fast`], 1));
    });
    it(`should return totalResult 1150: `, () => {
      assert.equal(1150, getResult([`fast`, `fast`, `wrong`, `fast`, `slow`, `fast`, `fast`, `fast`, `fast`, `wrong`], 1));
    });
  });
});
