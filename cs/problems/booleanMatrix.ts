/**
 * Boolean Matrix
 *
 * Source: https://www.geeksforgeeks.org/a-boolean-matrix-question/
 */

export type BinaryList = Array<0 | 1>

// loop through all cells
//   For each row containing a 1, add index to sets of rows
//   For each column containing a 1, add to set of columns
// loop through set of rows
//   Fill in each row
// loop through set of columns
//   Fill in each column

const booleanMatrix = (matrix: BinaryList[]): void => {
  const rows = new Set<number>()
  const columns = new Set<number>()

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 1) {
        rows.add(rowIndex)
        columns.add(columnIndex)
      }
    })
  })

  rows.forEach((rowIndex) => {
    matrix[rowIndex].forEach((_, i) => matrix[rowIndex][i] = 1)
  })

  columns.forEach((columnIndex) => {
    matrix.forEach((row) => {
      row[columnIndex] = 1
    })
  })
}

export default booleanMatrix
