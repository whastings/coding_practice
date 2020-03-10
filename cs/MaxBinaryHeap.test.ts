import MaxBinaryHeap from './MaxBinaryHeap'

describe('MaxBinaryHeap', () => {
  describe('build()', () => {
    it('takes an initial array of elements and heapifies it', () => {
      const initialArray = [5, 3, 2, 10, 1, 9, 8, 6, 4, 7]
      const heap = MaxBinaryHeap.build(initialArray)

      expect(heap.toArray()).toEqual([10, 7, 9, 6, 5, 2, 8, 3, 4, 1])
    })
  })

  describe('heapSort()', () => {
    it('sorts its elements in ascending order', () => {
      const initialArray = [5, 3, 2, 10, 1, 9, 8, 6, 4, 7]
      const heap = MaxBinaryHeap.build(initialArray)

      expect(heap.heapSort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
  })
})
