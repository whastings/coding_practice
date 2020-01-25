import { binarySearch, binarySearchMemoryEfficient, binarySearchIterative } from './binarySearch'

const array = [1, 2, 4, 5, 8, 11, 12, 23, 96, 99]

describe('binarySearch', () => {
  it('returns index of element that exists in array', () => {
    expect(binarySearch(array, 11)).toEqual(5)
    expect(binarySearch(array, 1)).toEqual(0)
    expect(binarySearch(array, array[array.length - 1])).toEqual(array.length - 1)
  })

  it('returns -1 for element that does not exist in array', () => {
    expect(binarySearch(array, 100)).toEqual(-1)
  })
})

describe('binarySearchMemoryEfficient', () => {
  it('returns index of element that exists in array', () => {
    expect(binarySearchMemoryEfficient(array, 11)).toEqual(5)
    expect(binarySearchMemoryEfficient(array, 1)).toEqual(0)
    expect(binarySearchMemoryEfficient(array, array[array.length - 1])).toEqual(array.length - 1)
  })

  it('returns -1 for element that does not exist in array', () => {
    expect(binarySearchMemoryEfficient(array, 100)).toEqual(-1)
  })
})

describe('binarySearchIterative', () => {
  it('returns index of element that exists in array', () => {
    expect(binarySearchIterative(array, 11)).toEqual(5)
    expect(binarySearchIterative(array, 1)).toEqual(0)
    expect(binarySearchIterative(array, array[array.length - 1])).toEqual(array.length - 1)
  })

  it('returns -1 for element that does not exist in array', () => {
    expect(binarySearchIterative(array, 100)).toEqual(-1)
  })
})
