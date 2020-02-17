import { climbStairs, climbStairsBottomUp } from './climbStairs'

describe('climbStairs()', () => {
  it('returns number of combinations of steps to climb N stairs', () => {
    expect(climbStairs(2)).toBe(2)
    expect(climbStairs(3)).toBe(3)
  })
})

describe('climbStairsBottomUp()', () => {
  it('returns number of combinations of steps to climb N stairs', () => {
    expect(climbStairsBottomUp(2)).toBe(2)
    expect(climbStairsBottomUp(3)).toBe(3)
  })
})
