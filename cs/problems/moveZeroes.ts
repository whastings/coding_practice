/**
 * Move Zeroes
 *
 * Move all zeroes to end of array, in-place
 *
 * Source: https://leetcode.com/problems/move-zeroes/
 */

// Keep track of num zeroes
// Loop through array
//   If current element is zero, increment num zeroes
//   Else, swap current element with element num zeroes behind it

// Time complexity: O(n)
const moveZeroes = (array: number[]): void => {
  let numZeroes = 0

  for (let i = 0; i < array.length; i++) {
    const currentElement = array[i]
    if (currentElement === 0) {
      numZeroes += 1
    } else if (numZeroes > 0) {
      const newIndex = i - numZeroes
      array[newIndex] = currentElement
      array[i] = 0
    }
  }
}

export default moveZeroes
