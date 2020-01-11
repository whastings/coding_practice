import BinarySearchTree from './BinarySearchTree'

describe('BinarySearchTree', () => {
  it('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8]
    const tree = new BinarySearchTree<number>()
    nums.map((num) => tree.add(num))
    const root = tree.root
    if (!root) {
      throw new Error()
    }

    expect(root?.value)?.toEqual(3)

    expect(root?.left?.value)?.toEqual(1)
    expect(root?.left?.left)?.toBeNull()

    expect(root?.left?.right?.value)?.toEqual(2)
    expect(root?.left?.right?.left)?.toBeNull()
    expect(root?.left?.right?.right)?.toBeNull()

    expect(root?.right?.value)?.toEqual(7)

    expect(root?.right?.left?.value)?.toEqual(4)
    expect(root?.right?.left?.left)?.toBeNull()

    expect(root?.right?.left?.right?.value)?.toEqual(6)
    expect(root?.right?.left?.right?.left?.value)?.toEqual(5)
    expect(root?.right?.left?.right?.left?.right)?.toBeNull()
    expect(root?.right?.left?.right?.left?.left)?.toBeNull()

    expect(root?.right?.right?.value)?.toEqual(10)
    expect(root?.right?.right?.right)?.toBeNull()

    expect(root?.right?.right?.left?.value)?.toEqual(9)
    expect(root?.right?.right?.left?.right)?.toBeNull()

    expect(root?.right?.right?.left?.left?.value)?.toEqual(8)
    expect(root?.right?.right?.left?.left?.right)?.toBeNull()
    expect(root?.right?.right?.left?.left?.left)?.toBeNull()
  })
})