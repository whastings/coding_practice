/**
 * Insertion Sort
 *
 * Works best with arrays that are already mostly sorted.
 *
 * Worst case: O(n^2)
 *
 * 1. Consider the first element in array to be a sorted collection of length one.
 * 2. Move to the next element, and if necessary move it to the correct spot in the
 *    sorted section of the array.
 * 3. Continue moving forward over the whole array, moving elements into the already
 *    sorted portion.
 */

export const insertionSort = <T>(array: T[]): T[] => {
  for (let i = 1; i < array.length; i++) {
    const currentEl = array[i]
    for (let j = 0; j < i; j++) {
      if (currentEl < array[j]) {
        array.splice(i, 1)
        array.splice(j, 0, currentEl)
        break;
      }
    }
  }
  return array
}
