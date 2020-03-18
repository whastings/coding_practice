import BinarySearchTree from './BinarySearchTree'

describe('BinarySearchTree', () => {
  const makeTree = () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8]
    const tree = new BinarySearchTree<number>()
    nums.map((num) => tree.add(num))
    return tree
  }

  it('creates a correct tree', () => {
    const tree = makeTree()
    const root = tree.root

    expect(root?.value).toEqual(3)

    expect(root?.left?.value).toEqual(1)
    expect(root?.left?.left).toBeNull()

    expect(root?.left?.right?.value).toEqual(2)
    expect(root?.left?.right?.left).toBeNull()
    expect(root?.left?.right?.right).toBeNull()

    expect(root?.right?.value).toEqual(7)

    expect(root?.right?.left?.value).toEqual(4)
    expect(root?.right?.left?.left).toBeNull()

    expect(root?.right?.left?.right?.value).toEqual(6)
    expect(root?.right?.left?.right?.left?.value).toEqual(5)
    expect(root?.right?.left?.right?.left?.right).toBeNull()
    expect(root?.right?.left?.right?.left?.left).toBeNull()

    expect(root?.right?.right?.value).toEqual(10)
    expect(root?.right?.right?.right).toBeNull()

    expect(root?.right?.right?.left?.value).toEqual(9)
    expect(root?.right?.right?.left?.right).toBeNull()

    expect(root?.right?.right?.left?.left?.value).toEqual(8)
    expect(root?.right?.right?.left?.left?.right).toBeNull()
    expect(root?.right?.right?.left?.left?.left).toBeNull()
  })

  describe('contains()', () => {
    it('returns a boolean indicating whether an element is present in the tree', () => {
      const tree = makeTree()

      expect(tree.contains(9)).toBe(true)
      expect(tree.contains(90)).toBe(false)
    })
  })
})
