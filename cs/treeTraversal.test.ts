import BinarySearchTree from './BinarySearchTree'
import {
  traverseDepthFirstPreorder,
  traverseDepthFirstInOrder,
  traverseDepthFirstPostOrder,
  traverseBreadthFirst,
} from './treeTraversal'

const makeTree = () => {
  const tree = new BinarySearchTree<number>()
  const nums = [8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11]
  nums.forEach((num) => {
    tree.add(num)
  })
  return tree
}

describe('traverseDepthFirstPreorder()', () => {
  it('traverses the tree correctly', () => {
    const tree = makeTree()
    const result: number[] = []

    traverseDepthFirstPreorder(tree, (value: number) => {
      result.push(value)
    })

    expect(result).toEqual([8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11])
  })
})

describe('traverseDepthFirstInOrder()', () => {
  it('traverses the tree correctly', () => {
    const tree = makeTree()
    const result: number[] = []

    traverseDepthFirstInOrder(tree, (value: number) => {
      result.push(value)
    })

    expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })
})

describe('traverseDepthFirstPostOrder()', () => {
  it('traverses the tree correctly', () => {
    const tree = makeTree()
    const result: number[] = []

    traverseDepthFirstPostOrder(tree, (value: number) => {
      result.push(value)
    })

    expect(result).toEqual([2, 3, 6, 7, 5, 4, 9, 11, 10, 12, 8])
  })
})

describe('traverseBreadthFirst', () => {
  it('traverses the tree correctly', () => {
    const tree = makeTree()
    const result: number[] = []

    traverseBreadthFirst(tree, (value: number) => {
      result.push(value)
    })

    expect(result).toEqual([8, 4, 12, 3, 5, 10, 2, 7, 9, 11, 6])
  })
})
