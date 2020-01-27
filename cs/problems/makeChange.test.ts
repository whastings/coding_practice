import { makeChange, makeChangeGreedy } from './makeChange'

describe('makeChange', () => {
  it('returns the fewest amount of coins that adds up to an amount', () => {
    expect(makeChange([1, 6, 10], 12)).toEqual([6, 6])
    expect(makeChange([1, 6, 10], 20)).toEqual([10, 10])
  })
})

describe('makeChangeGreedy', () => {
  it('returns the easiest to calculate amount of coins that makes up an amount', () => {
    expect(makeChangeGreedy([1, 6, 10], 12)).toEqual([10, 1, 1])
  })
})
