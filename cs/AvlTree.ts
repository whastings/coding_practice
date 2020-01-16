/**
 * AVL Tree
 *
 * - A binary search tree that auto-rebalances as elements are added.
 *   - A node's subtree is out of balance if the difference in height between the
 *     left and right sides is greater than 1.
 *   - Best to do add recursively so you can check the balance of each node after adding.
 *   - If a node is unbalanced and the right subtree has the greater height, it is right-heavy,
 *     and you do a right-rotation.
 *     - Example (from http://btholt.github.io/four-semesters-of-cs/):
 *       5 - node A
 *        \
 *          8 - node B
 *           \
 *            9 - node C
 *       - swap the values of nodes A and B
 *       - make node B the left child of node A
 *       - make node C the right child of node A
 *       - move node B's left child to its right child (in this case they're both null)
 *       - make node A's _original_ left child (which was null in this case) the left child of node B
 *       - update the heights of all the nodes involved
 *   - If node is left-heavy, do left-rotation, which is mirror image of right.
 *   - If heavier subtree is "bent" (child is heavy in opposite direction), you have to do an extra rotation
 *     - Example:
 *       5 - node A
 *        \
 *         8 - node B
 *        /
 *       7 - node C
 *       - First perform left rotation on node B
 *       - Then perform a right rotation on node A
 * - Since it is always balanced, the worst case for find is always O(log(n))
 * - Adding algorithm is same as BST with lesser values on left and greater on right.
 */

class AvlNode<T> {
  public left: AvlNode<T> | null = null
  public right: AvlNode<T> | null = null
  public value: T

  constructor(value: T) {
    this.value = value
  }

  add(value: T): void {
    const side = (value < this.value) ? 'left' : 'right'
    const sideNode = this[side]
    if (sideNode) {
      sideNode.add(value)
      this.rebalance()
    } else {
      this[side] = new AvlNode(value)
    }
  }

  protected height(): number {
    const leftHeight = this.leftHeight()
    const rightHeight = this.rightHeight()

    return (leftHeight > rightHeight) ? leftHeight : rightHeight
  }

  protected isLeftHeavy(): boolean {
    return (this.leftHeight() - this.rightHeight()) > 1
  }

  protected isRightHeavy(): boolean {
    return (this.rightHeight() - this.leftHeight()) > 1
  }

  protected leftHeight(): number {
    if (this.left) {
      return this.left.height() + 1
    }

    return 0
  }

  protected rightHeight(): number {
    if (this.right) {
      return this.right.height() + 1
    }

    return 0
  }

  protected rotateLeft(): void {
    const nodeA = this
    const nodeB = this.left!

    const nodeC = nodeB.left
    const nodeARight = this.right

    const nodeAValue = nodeA.value
    const nodeBValue = nodeB.value
    nodeA.value = nodeBValue
    nodeB.value = nodeAValue

    nodeA.right = nodeB
    nodeA.left = nodeC

    nodeB.left = nodeB.right
    nodeB.right = nodeARight
  }

  protected rotateRight(): void {
    const nodeA = this
    const nodeB = this.right!

    const nodeC = nodeB.right
    const nodeALeft = this.left

    const nodeAValue = nodeA.value
    const nodeBValue = nodeB.value
    nodeA.value = nodeBValue
    nodeB.value = nodeAValue

    nodeA.left = nodeB
    nodeA.right = nodeC

    nodeB.right = nodeB.left
    nodeB.left = nodeALeft
  }

  private rebalance(): void {
    if (this.isRightHeavy()) {
      if (this.right!.leftHeight() > this.right!.rightHeight()) {
        this.right!.rotateLeft()
      }
      this.rotateRight()
    } else if (this.isLeftHeavy()) {
      if (this.left!.rightHeight() > this.left!.leftHeight()) {
        this.left!.rotateRight()
      }
      this.rotateLeft()
    }
  }
}

class AvlTree<T> {
  public root: AvlNode<T> | null = null

  add(value: T): void {
    if (!this.root) {
      this.root = new AvlNode(value)
      return
    }

    this.root.add(value)
  }
}

export default AvlTree
