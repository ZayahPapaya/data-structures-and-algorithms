const hashmap1 = new Map([
  ['diligent', 'employed'],
  ['fond', 'enamored'],
  ['guide', 'usher'],
  ['outfit', 'garb'],
  ['wrath', 'anger']
]);
const hashmap2 = new Map([
  ['diligent', 'idle'],
  ['fond', 'averse'],
  ['guide', 'follow'],
  ['flow', 'jam'],
  ['wrath', 'delight']
]);

const{ leftJoin } = require('../app')

describe('left joining', () => {
  it('left joins', () => {
    expect(leftJoin(hashmap1, hashmap2)).toEqual([
      [ 'diligent', 'employed', 'idle' ],
      [ 'fond', 'enamored', 'averse' ],
      [ 'guide', 'usher', 'follow' ],
      [ 'outfit', 'garb', null ],
      [ 'wrath', 'anger', 'delight' ]
    ])
  })
});