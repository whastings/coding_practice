/**
 * Queue
 *
 * - First-in-first-out
 * - Good to implement with Linked List, since arrays would require shifting elements on dequeue
 *   - Unless language somehow optimizes that array operation
 * - Use case examples:
 *   - JS event loop queue
 */

import LinkedList from './LinkedList'

class Queue<T> {
  elements: LinkedList<T> = new LinkedList()

  dequeue(): T | undefined {
    return this.elements.shift()
  }

  enqueue(value: T) {
    this.elements.push(value)
  }
}

export default Queue
