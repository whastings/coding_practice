/**
 * Stack
 *
 * - Last-in-first-out
 * - Use case examples:
 *   - Browser back navigation
 *   - Undo
 *   - Function call stack
 */

class Stack<T> {
  private elements: T[] = []

  get length() {
    return this.elements.length
  }

  pop(): T | undefined {
    return this.elements.pop()
  }

  push(value: T) {
    this.elements.push(value)
  }
}

export default Stack