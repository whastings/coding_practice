import StackQueue from './StackQueue'

describe('StackQueue', () => {
  it('stores elements in FIFO order', () => {
    const queue = new StackQueue<number>()
    queue.enqueue(2)
    queue.enqueue(4)
    queue.enqueue(6)
    queue.enqueue(8)

    expect(queue.dequeue()).toEqual(2)
    expect(queue.dequeue()).toEqual(4)

    queue.enqueue(10)
    expect(queue.dequeue()).toEqual(6)
    expect(queue.dequeue()).toEqual(8)

    queue.enqueue(12)
    expect(queue.dequeue()).toEqual(10)
    expect(queue.dequeue()).toEqual(12)
    expect(queue.dequeue()).toBeUndefined()
  })
})
