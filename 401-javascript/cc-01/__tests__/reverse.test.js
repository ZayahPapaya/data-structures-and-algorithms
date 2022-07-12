'use strict';


const { it, expect } = require('@jest/globals');
const Handler = require('../reverse');

describe('Reverse Array', () => {

  it('returns reversed array', () => {
    expect(Handler.reverseArray([1, 2, 3, 4, 5, 6])).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });

});
