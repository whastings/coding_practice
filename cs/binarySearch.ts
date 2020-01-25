/**
 * Binary Search
 *
 * O(log(n))
 */

export const binarySearch = <T>(array: T[], searchValue: T): number => {
  if (array.length < 2) {
    return (array[0] === searchValue) ? 0 : -1
  }

  const midIndex = Math.floor(array.length / 2)

  if (array[midIndex] > searchValue) {
    return binarySearch(array.slice(0, midIndex), searchValue)
  }

  if (array[midIndex] < searchValue) {
    const upperHalfResult = binarySearch(array.slice(midIndex + 1), searchValue)
    return (upperHalfResult === -1) ? -1 : midIndex + upperHalfResult + 1
  }

  return midIndex
}

export const binarySearchMemoryEfficient = <T>(
  array: T[],
  searchValue: T,
  startIndex = 0,
  endIndex = array.length - 1
): number => {
  if (startIndex === endIndex) {
    return (array[startIndex] === searchValue) ? startIndex : -1
  }

  const midIndex = Math.floor((startIndex + endIndex) / 2)

  if (array[midIndex] < searchValue) {
    return binarySearchMemoryEfficient(array, searchValue, (midIndex + 1), endIndex)
  }

  if (array[midIndex] > searchValue) {
    return binarySearchMemoryEfficient(array, searchValue, startIndex, (midIndex - 1))
  }

  return midIndex
}

export const binarySearchIterative = <T>(array: T[], searchValue: T): number => {
  let startIndex = 0
  let endIndex = array.length - 1

  while (startIndex < endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)

    if (array[midIndex] < searchValue) {
      startIndex = midIndex + 1
    } else if (array[midIndex] > searchValue) {
      endIndex = midIndex - 1
    } else {
      return midIndex
    }
  }

  return (array[startIndex] === searchValue) ? startIndex : -1
}
