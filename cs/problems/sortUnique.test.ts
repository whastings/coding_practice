import sortUnique from './sortUnique'

describe('sortUnique', () => {
  it('sorts an array while removing duplicate elements', () => {
    const array = [4, 2, 2, 3, 2, 2, 2]
    expect(sortUnique(array)).toEqual([2, 3, 4])
  })

  it('sorts numbers correctly', () => {
    const array = [10, 1, 2, 20]
    expect(sortUnique(array)).toEqual([1, 2, 10, 20])
  })

  it('sorts strings correctly', () => {
    const array = ['b', 'c', 'a', 'b', 'd']
    expect(sortUnique(array)).toEqual(['a', 'b', 'c', 'd'])
  })
})
