import { insertionSort } from './insertionSort'

describe('insertionSort', () => {
  it('sorts arrays', () => {
    const nums = [3, 5, 10, 8, 2, 6, 4, 7, 9, 1];
    insertionSort(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const chars = ['b', 'h', 'u', 'x', 'i', 'q', 'a', 'e']
    insertionSort(chars)
    expect(chars).toEqual(['a', 'b', 'e', 'h', 'i', 'q', 'u', 'x'])
  })
})
