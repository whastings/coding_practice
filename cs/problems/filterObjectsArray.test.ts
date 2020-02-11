import filterObjectsArray from './filterObjectsArray'

describe('filterObjectsArray()', () => {
  it('removes all objects in one array that match an object in another array', () => {
    const objects = [
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 0, c: 3 },
      { a: 1, b: 0, c: 5 },
      { a: 1, b: 0 },
      { a: 1, b: 0, c: 5, d: 10 },
    ]
    const patterns = [
      { b: 2 },
      { c: 5 },
      { d: 10 },
    ]

    expect(filterObjectsArray(objects, patterns)).toEqual([
      { a: 1, b: 0, c: 3 },
      { a: 1, b: 0 },
    ])
  })
})
