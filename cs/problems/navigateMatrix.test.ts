import navigateMatrix, { MatrixDirection } from './navigateMatrix'

describe('navigateMatrix()', () => {
  it('can navigate diagonally to spell a word', () => {
    const matrix = [
      ['I', 'B', 'C', 'A', 'K', 'E', 'A'],
      ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
      ['G', 'H', 'O', 'E', 'L', 'A', 'D'],
    ]
    const result = navigateMatrix(
      matrix,
      [
        MatrixDirection.SouthEast,
        MatrixDirection.NorthEast,
        MatrixDirection.SouthEast,
      ],
    )
    expect(result.join('')).toEqual('IROCKED')
  })
})
