/**
 * Quick Sort
 *
 * Time: O(n*log(n))
 * - Though can be O(n^2) in some situations (e.g. when passed an already sorted list).
 *
 * - Is a divide-and-conquer algorithm.
 * - Is not a stable sort.
 *
 * 1. Pick an element in array to be the Pivot.
 *   - Can be any element, but picking the last one makes the code simpler.
 *   - There are many variations of Quick Sort that choose different pivots.
 * 2. Put every element less than pivot into on array and every element greater
 *    than into another.
 * 3. Recursively call quickSort on both side arrays.
 * 4. Keep recursing until array is length one or empty.
 * 5. Combine sorted lesser half, pivot, and sorted greater half
 */

 export const quickSort = <T>(array: T[]): T[] => {
   if (array.length < 2) {
     return array
   }

   const pivot = array[array.length - 1]
   const lesserArray = []
   const greaterArray = []
   for (let i = 0; i < (array.length - 1); i++) {
     if (array[i] < pivot) {
       lesserArray.push(array[i])
     } else {
       greaterArray.push(array[i])
     }
   }

   const sortedLesserArray = quickSort(lesserArray)
   const sortedGreaterArray = quickSort(greaterArray)

   return sortedLesserArray.concat(pivot, sortedGreaterArray)
 }