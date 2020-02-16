import { rotateArray, rotateArrayInPlace } from './rotateArray'

describe('rotateArray()', () => {
  it('rotates the elements in an array by N places', () => {
    const array = [1, 2, 3, 4, 5, 6]
    expect(rotateArray(array, 2)).toEqual([5, 6, 1, 2, 3, 4])
  })
})

describe('rotateArrayInPlace()', () => {
  it('rotates the elements in an array by N places', () => {
    const array = [1, 2, 3, 4, 5, 6]
    rotateArrayInPlace(array, 2)
    expect(array).toEqual([5, 6, 1, 2, 3, 4])
  })
})
