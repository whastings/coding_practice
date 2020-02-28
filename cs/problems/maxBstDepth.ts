/**
 * Maximum depth of Binary Search Tree
 *
 * Source: https://leetcode.com/problems/maximum-depth-of-binary-tree/
 */

import { BstNode } from '../BinarySearchTree'

const maxBstDepth = (node: BstNode<any>): number => {
  const leftDepth = node.left ? maxBstDepth(node.left) : 0
  const rightDepth = node.right ? maxBstDepth(node.right) : 0
  const maxDepth = Math.max(leftDepth, rightDepth)

  return maxDepth + 1
}

export default maxBstDepth
