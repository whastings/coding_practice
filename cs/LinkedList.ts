/**
 * Linked List
 *
 * - Gets are O(n) instead of O(1) like ArrayList
 * - Deletes are a bit cheaper since actually removing element is O(1)
 *   - Just point `next` of previous node to new next node
 */

interface Node<T> {
  value: T,
  next: Node<T> | null,
}

class LinkedList<T> {
  private _length: number = 0
  private head: Node<T> | null = null
  private tail: Node<T> | null = null

  get length(): number {
    return this._length
  }

  delete(index: number): void {
    const previousNode = this.getNode(index - 1)
    const nodeToDelete = (index === 0) ? this.head : previousNode?.next

    if (!nodeToDelete) {
      return
    }

    const nextNode = nodeToDelete.next

    if (previousNode) {
      previousNode.next = nextNode
    }

    if (index === 0) {
      this.head = nextNode
    }

    if (index === (this._length - 1)) {
      this.tail = previousNode
    }

    this._length -= 1
  }

  get(index: number): T | undefined {
    return this.getNode(index)?.value
  }

  pop(): T | undefined {
    const lastValue = this.tail?.value
    this.delete(this._length - 1)
    return lastValue
  }

  push(value: T): void {
    const newNode: Node<T> = { value, next: null }

    if (this.tail) {
      this.tail.next = newNode
    } else {
      this.head = newNode
    }

    this.tail = newNode
    this._length += 1
  }

  shift(): T | undefined {
    const firstValue = this.head?.value

    if (this._length) {
      this.head = this.head?.next || null
      this._length -= 1
    }

    return firstValue
  }

  private getNode(index: number): Node<T> | null {
    if (index < 0 || index >= this._length) {
      return null
    }

    if (index === (this._length - 1)) {
      return this.tail
    }

    let currentNode = this.head
    for (let i = 1; (i <= index) && currentNode; i++) {
      currentNode = currentNode.next
    }

    return currentNode
  }
}

export default LinkedList
