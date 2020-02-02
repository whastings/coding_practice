/**
 * Binary Search Tree
 *
 * - Each node has 0, 1, or 2 subtrees
 * - For a node, every element in its left subtree has a lesser value than it,
 *   and every element in its right subtree has a greater value.
 * - So adding, deleting, and finding elements is fast: O(log(n)).
 *   - But are O(n) at worst case (e.g. adding already sorted list)
 */

export interface BstNode<T> {
  value: T,
  right: BstNode<T> | null,
  left: BstNode<T> | null,
}

class BinarySearchTree<T> {
  public root: BstNode<T> | null = null

  add(value: T): void {
    if (!this.root) {
      this.root = { value, left: null, right: null }
      return
    }

    let currentNode = this.root
    let nextNode: BstNode<T> | null = currentNode
    let side: 'left' | 'right' = 'left'
    while (nextNode) {
      currentNode = nextNode
      if (value < currentNode.value) {
        nextNode = currentNode.left
        side = 'left'
      } else {
        nextNode = currentNode.right
        side = 'right'
      }
    }

    currentNode[side] = { value, left: null, right: null }
  }
}

export default BinarySearchTree
