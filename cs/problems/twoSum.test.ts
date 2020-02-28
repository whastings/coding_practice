import twoSum from './twoSum'

describe('twoSum', () => {
  it('returns the indices of numbers that add up to a target number', () => {
    const nums = [2, 11, 7, 15]
    expect(twoSum(nums, 9)).toEqual([0, 2])
  })
})
