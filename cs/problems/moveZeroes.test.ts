import moveZeroes from './moveZeroes'

describe('moveZeroes()', () => {
  it('moves all zeroes to the end of the array, in-place', () => {
    const array = [4, 0, 1, 0, 3, 12]
    moveZeroes(array)

    expect(array).toEqual([4, 1, 3, 12, 0, 0])
  })
})
