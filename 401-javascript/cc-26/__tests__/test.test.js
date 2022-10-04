const { it, expect } = require('@jest/globals');
const{ insertionSort } = require('../app');

describe('sorting', () => {
  it('sorts', () => {
    const arr = [8, 4, 23, 42, 16, 15];
    expect(insertionSort(arr)).toStrictEqual([4, 8, 15, 16, 23, 42]);
  });
});