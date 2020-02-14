import reorderArray from './reorderArray'

describe('reorderArray()', () => {
  it('reorders the elements of an array based on a list of new indexes', () => {
    const array = [1, 20, 3, 16, 9, 8, 0, 2]
    const newIndexes = [2, 1, 4, 0, 7, 6, 5, 3]

    reorderArray(array, newIndexes)

    expect(array).toEqual([16, 20, 1, 2, 3, 0, 8, 9])
  })
})
