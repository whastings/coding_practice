/**
 * Big O
 *
 * - Only cares about the most significant terms
 *   - e.g. x^2 in 3x^2 + x + 1
 * - Cares about worst case scenario for an algorithm (e.g. no only return for a find)
 */

const collection = [1, 2, 3, 4, 5, 6]

/**
 * Linear - O(n)
 *
 * Traverses over a collection only once
 */
collection.forEach(() => {
  // Do something
})

/**
 * Quadratic - O(n^2)
 *
 * For every element in collection, traverses over entire collection (loop within loop)
 */
for (let i = 0; i < collection.length; i++) {
  for (let j = 0; j < collection.length; j++) {
    // Do something with elements at i and j
  }
}
