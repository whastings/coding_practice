import { quickSort } from './quickSort'

describe('quickSort', () => {
  it('sorts arrays', () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    const sortedNums = quickSort(nums);
    expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const chars = ['b', 'h', 'u', 'x', 'i', 'q', 'a', 'e', 't']
    const sortedChars = quickSort(chars)
    expect(sortedChars).toEqual(['a', 'b', 'e', 'h', 'i', 'q', 't', 'u', 'x'])
  })
})
