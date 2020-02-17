import booleanMatrix, { BinaryList } from './booleanMatrix'

describe('booleanMatrix', () => {
  it('fills all rows/columns where a cell contains 1', () => {
    const matrix1: Array<BinaryList> = [
      [0, 0, 0],
      [0, 0, 1],
    ]
    booleanMatrix(matrix1)
    expect(matrix1).toEqual([
      [0, 0, 1],
      [1, 1, 1],
    ])

    const matrix2: Array<BinaryList> = [
      [1, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ]
    booleanMatrix(matrix2)
    expect(matrix2).toEqual([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
    ])
  })
})
