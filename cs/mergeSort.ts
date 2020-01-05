/**
 * Merge Sort
 *
 * Time: O(n*log(n))
 * - Has to compare each element at least once (n)
 * Space: O(n)
 * - Because it creates and destroys arrays as it builds final array
 *
 * - Is a divide-and-conquer algorithm.
 * - Has much more consistent performance than insertion sort,
 *   so is more commonly used.
 * - Is a Stable Sort (two equivalent elements will stay in same order).
 *
 * 1. Divide array (roughly) in half.
 * 2. Recursively call mergeSort on each half.
 * 3. Keep recursing until array is length one, then return array
 * 4. Combine both returned arrays from recursive calls in sorted order and
 *    return sorted array.
 */

const mergeArrays = <T>(sortedArray1: T[], sortedArray2: T[]): T[] => {
  let pointer1 = 0
  let pointer2 = 0
  const mergedArray = []

  while (pointer1 < sortedArray1.length && pointer2 < sortedArray2.length) {
    if (sortedArray1[pointer1] < sortedArray2[pointer2]) {
      mergedArray.push(sortedArray1[pointer1])
      pointer1 += 1
    } else {
      mergedArray.push(sortedArray2[pointer2])
      pointer2 += 1
    }
  }

  // TODO: Write helper function that doesn't create new arrays
  return mergedArray.concat(
    sortedArray1.slice(pointer1),
    sortedArray2.slice(pointer2),
  )
}

export const mergeSort = <T>(array: T[]): T[] => {
  if (array.length < 2) {
    return array
  }

  const midIndex = Math.floor(array.length / 2)
  const half1 = array.slice(0, midIndex)
  const half2 = array.slice(midIndex)

  const sortedHalf1 = mergeSort(half1)
  const sortedHalf2 = mergeSort(half2)

  return mergeArrays(sortedHalf1, sortedHalf2)
}
