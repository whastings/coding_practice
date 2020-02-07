import { flatten, flattenIterative } from './flatten'

const nestedArray = [
  1,
  2,
  [undefined],
  [null],
  NaN,
  [
    3,
    4,
    [
      5,
      [
        6
      ]
    ],
    7,
  ],
  8,
  9,
  { foo: 'bar' },
  10,
]

describe('flatten()', () => {
  it('flattens a deeply nested array of arrays', () => {
    expect(flatten(nestedArray)).toEqual(
      [1, 2, undefined, null, NaN, 3, 4, 5, 6, 7, 8, 9, { foo: 'bar' }, 10]
    )
  })
})

describe('flattenIterative()', () => {
  it('flattens a deeply nested array of arrays', () => {
    expect(flattenIterative(nestedArray)).toEqual(
      [1, 2, undefined, null, NaN, 3, 4, 5, 6, 7, 8, 9, { foo: 'bar' }, 10]
    )
  })
})