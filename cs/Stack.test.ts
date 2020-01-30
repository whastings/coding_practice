import Stack from './Stack'

describe('Stack', () => {
  it('stores elements in LIFO order', () => {
    const stack = new Stack<number>()
    stack.push(2)
    stack.push(4)
    stack.push(6)

    expect(stack.pop()).toEqual(6)
    expect(stack.pop()).toEqual(4)
    expect(stack.pop()).toEqual(2)
    expect(stack.pop()).toBeNull()
  })
})