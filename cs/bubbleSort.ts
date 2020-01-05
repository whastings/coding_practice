/**
 * Bubble Sort
 *
 * O(n^2)
 *
 * 1. Loop through all elements in an array, swapping each pair of adjacent
 *    elements that are not in the correct order
 * 2. Repeat step 1 until you've looped through the array without swapping
 *    any elements.
 */

export const bubbleSort = <T>(array: T[]): T[] => {
  let finished

  do {
    finished = true
    for (let i = 1; i < array.length; i++) {
      const num1 = array[i - 1]
      const num2 = array[i]
      if (num2 < num1) {
        array[i - 1] = num2
        array[i] = num1
        finished = false
      }
    }
  } while (!finished)

  return array
}
