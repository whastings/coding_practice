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

  pop(): T | null {
    return this.elements.pop() || null
  }

  push(value: T) {
    this.elements.push(value)
  }
}

export default Stack