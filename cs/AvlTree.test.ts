import AvlTree from './AvlTree'

describe('AvlTree', () => {
  it('can balance with a simple right-rotation', () => {
    const nums = [1, 3, 5]
    const tree = new AvlTree()
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(3)
    expect(root?.left?.value).toEqual(1)
    expect(root?.right?.value).toEqual(5)
  })

  it('can balance with a more complex right-rotation', () => {
    const nums = [1, 0, 3, 5, 7, 9]
    const tree = new AvlTree
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(5)
    expect(root?.left?.value).toEqual(1)
    expect(root?.left?.left?.value).toEqual(0)
    expect(root?.left?.left?.left).toBeNull()
    expect(root?.left?.left?.right).toBeNull()
    expect(root?.left?.right?.value).toEqual(3)
    expect(root?.left?.right?.right).toBeNull()
    expect(root?.left?.right?.left).toBeNull()
    expect(root?.right?.value).toEqual(7)
    expect(root?.right?.right?.value).toEqual(9)
    expect(root?.right?.right?.right).toBeNull()
    expect(root?.right?.right?.left).toBeNull()
  })

  it('can balance with a left-rotation', () => {
    const nums = [5, 3, 1]
    const tree = new AvlTree()
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(3)
    expect(root?.left?.value).toEqual(1)
    expect(root?.right?.value).toEqual(5)
  })

  it('can balance with a more complex left-rotation', () => {
    const nums = [7, 9, 5, 3, 1, 0]
    const tree = new AvlTree()
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(3)
    expect(root?.right?.value).toEqual(7)
    expect(root?.right?.right?.value).toEqual(9)
    expect(root?.right?.right?.right).toBeNull()
    expect(root?.right?.right?.left).toBeNull()
    expect(root?.right?.left?.value).toEqual(5)
    expect(root?.right?.left?.left).toBeNull()
    expect(root?.right?.left?.right).toBeNull()
    expect(root?.left?.value).toEqual(1)
    expect(root?.left?.left?.value).toEqual(0)
    expect(root?.left?.left?.left).toBeNull()
    expect(root?.left?.left?.right).toBeNull()
  })

  it('can handle a bend during a right-rotation', () => {
    const nums = [5, 7, 6]
    const tree = new AvlTree()
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(6)
    expect(root?.left?.value).toEqual(5)
    expect(root?.right?.value).toEqual(7)
  })

  it('can handle a bend during a left-rotation', () => {
    const nums = [7, 5, 6]
    const tree = new AvlTree()
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(6)
    expect(root?.left?.value).toEqual(5)
    expect(root?.right?.value).toEqual(7)
  })

  it('can handle a complex tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8]
    const tree = new AvlTree()
    nums.map((num) => tree.add(num))
    const root = tree.root

    expect(root?.value).toEqual(4)

    expect(root?.left?.value).toEqual(2)

    expect(root?.left?.left?.value).toEqual(1)
    expect(root?.left?.left?.left).toBeNull()
    expect(root?.left?.left?.right).toBeNull()

    expect(root?.left?.right?.value).toEqual(3)
    expect(root?.left?.right?.left).toBeNull()
    expect(root?.left?.right?.right).toBeNull()

    expect(root?.right?.value).toEqual(7)

    expect(root?.right?.left?.value).toEqual(6)
    expect(root?.right?.left?.right).toBeNull()

    expect(root?.right?.left?.left?.value).toEqual(5)
    expect(root?.right?.left?.left?.left).toBeNull()
    expect(root?.right?.left?.left?.right).toBeNull()

    expect(root?.right?.right?.value).toEqual(9)

    expect(root?.right?.right?.left?.value).toEqual(8)
    expect(root?.right?.right?.left?.left).toBeNull()
    expect(root?.right?.right?.left?.right).toBeNull()

    expect(root?.right?.right?.right?.value).toEqual(10)
    expect(root?.right?.right?.right?.left).toBeNull()
    expect(root?.right?.right?.right?.right).toBeNull()
  })
})
