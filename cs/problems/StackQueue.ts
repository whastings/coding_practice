/**
 * Implement a Queue using two Stacks
 *
 * Source: https://repl.it/@bgando/queue-two-stacks-prompt
 */

import Stack from '../Stack'

// Have out stack and in stack
// enqueue pushes elements onto in stack
// for dequeue
//   If out stack not empty, pop and return
//   Else move all elements from in stack to out stack, then pop and return

class StackQueue<T> {
  private outStack = new Stack<T>()
  private inStack = new Stack<T>()

  enqueue(value: T) {
    this.inStack.push(value)
  }

  dequeue(): T | undefined {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop()!)
      }
    }

    return this.outStack.pop()
  }
}

export default StackQueue
