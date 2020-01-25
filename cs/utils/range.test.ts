import range from './range'

describe('range', () => {
  it('returns an array of all numbers from start to end, inclusive', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5])
  })
})
