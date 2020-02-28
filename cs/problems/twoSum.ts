/**
 * Two Sum
 *
 * Source: https://leetcode.com/problems/two-sum
 */

const twoSum = (nums: number[], targetSum: number): [number, number] | null => {
  const numsToIndexes = new Map<number, number>()

  for (let [i, num] of nums.entries()) {
    const complement = targetSum - num
    if (numsToIndexes.has(complement)) {
      return [numsToIndexes.get(complement)!, i]
    }
    numsToIndexes.set(num, i)
  }
  return null
}

export default twoSum
