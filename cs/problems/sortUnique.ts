/**
 * sortUnique
 *
 * Removes duplicates from an array and returns it sorted.
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 * - For keeping track of already seen elements
 */
const sortUnique = <T>(array: T[]): T[] => {
  const seenElements = new Set<T>()
  const uniqueArray = []

  for (let element of array) {
    if (!seenElements.has(element)) {
      uniqueArray.push(element)
      seenElements.add(element)
    }
  }

  return uniqueArray.sort((element1, element2) => {
    return (element1 > element2) ? 1 : -1
  })
}

export default sortUnique
