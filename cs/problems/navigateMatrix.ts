export enum MatrixDirection {
  North,
  NorthEast,
  East,
  SouthEast,
  South,
  SouthWest,
  West,
  NorthWest,
}

interface Position {
  y: number,
  x: number,
}

interface Step {
  y: -1 | 0 | 1,
  x: -1 | 0 | 1,
}

const navigateMatrix = <T>(matrix: T[][], directions: MatrixDirection[]): T[] => {
  // For each direction, store vertical and horizontal step (1, 0, or -1)
  // Reduce directions
  // Store current inner array and current index in inner array
  // While there's another element for both horizontal step and vertical step
  // Add element to result array and continue
  // When can't move further, go on to next direction, continuing from same place

  const directionToStep = (direction: MatrixDirection): Step => {
    switch (direction) {
      case MatrixDirection.SouthEast:
        return { y: 1, x: 1}
      case MatrixDirection.NorthEast:
        return { y: -1, x: 1}
      // TODO: Support other directions
      default:
        return { y: 0, x: 0}
    }
  }

  const inBounds = (index: number, length: number): boolean => {
    return index >= 0 && index < length
  }

  const getNextPosition = (position: Position, step: Step): Position => {
    return { x: position.x + step.x, y: position.y + step.y }
  }

  let currentPosition = { y: 0, x: 0 }
  return directions.reduce((result, currentDirection) => {
    const step = directionToStep(currentDirection)

    let nextPosition = getNextPosition(currentPosition, step)
    while (inBounds(nextPosition.y, matrix.length) && inBounds(nextPosition.x, matrix[nextPosition.y].length)) {
      currentPosition = nextPosition
      const nextElement = matrix[currentPosition.y][currentPosition.x]
      result.push(nextElement)
      nextPosition = getNextPosition(currentPosition, step)
    }

    return result
  }, [matrix[currentPosition.y][currentPosition.x]])
}

export default navigateMatrix
