import Queue from './Queue'

describe('Queue', () => {
  it('stores elements in FIFO order', () => {
    const queue = new Queue<number>()
    queue.enqueue(2)
    queue.enqueue(4)
    queue.enqueue(6)

    expect(queue.dequeue()).toEqual(2)
    expect(queue.dequeue()).toEqual(4)
    expect(queue.dequeue()).toEqual(6)
    expect(queue.dequeue()).toBeUndefined()
  })
})