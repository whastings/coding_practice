import maxBstDepth from './maxBstDepth'
import BinarySearchTree from '../BinarySearchTree'

describe('maxBstDepth()', () => {
  it('returns the maximum depth of the tree', () => {
    const nums = [9, 3, 20, 15, 25]
    const tree = new BinarySearchTree<number>()
    nums.forEach((num) => tree.add(num))

    expect(maxBstDepth(tree.root!)).toBe(3)
  })
})
