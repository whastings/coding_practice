/**
 * Climb Stairs
 *
 * Given stairs with N steps, how many combinations of steps can you take
 * if you can take 1 or 2 steps at a time?
 *
 * Source: https://leetcode.com/problems/climbing-stairs/
 *
 * Time complexity: O(2^n)
 * - Can be O(n) if memoization applied
 */

// Looping over [1, 2]
//   If step <= numSteps
//   Call climbStairs(numSteps - step)
//     Base case: numSteps = 0
//   Return num combos for 1 + num combos for 2

export const climbStairs = (numSteps: number): number => {
  const steps = [1, 2]

  return steps.reduce((count, step) => {
    if (step > numSteps) {
      return count
    }

    const remainingSteps = numSteps - step
    if (remainingSteps === 0) {
      return count + 1
    }
    return count + climbStairs(remainingSteps)
  }, 0)
}

export const climbStairsBottomUp = (numSteps: number): number => {
  const memos = new Map<number, number>()

  const takeSteps = (currentStep: number): number => {
    if (currentStep > numSteps) {
      return 0
    }

    if (currentStep === numSteps) {
      return 1
    }

    if (memos.has(currentStep)) {
      return memos.get(currentStep) || 0
    }

    const remainingWays = takeSteps(currentStep + 1) + takeSteps(currentStep + 2)
    memos.set(currentStep, remainingWays)
    return remainingWays
  }

  return takeSteps(0)
}
