import EventEmitter from './EventEmitter'

describe('EventEmitter', () => {
  it('takes event callbacks and calls them when events are emitted', () => {
    const emitter = new EventEmitter()
    const event1Callback = jest.fn()
    const event2Callback1 = jest.fn()
    const event2Callback2 = jest.fn()

    emitter.subscribe('foo', event1Callback)
    emitter.subscribe('bar', event2Callback1)
    emitter.subscribe('bar', event2Callback2)

    emitter.emit('foo', 1, 2)
    expect(event1Callback).toHaveBeenCalledWith(1, 2)
    expect(event2Callback1).not.toHaveBeenCalled()
    expect(event2Callback2).not.toHaveBeenCalled()

    emitter.emit('bar', 3, 4, 5)
    expect(event2Callback1).toHaveBeenCalledWith(3, 4, 5)
    expect(event2Callback2).toHaveBeenCalledWith(3, 4, 5)
    expect(event1Callback).not.toHaveBeenCalledWith(3, 4, 5)
  })

  it('returns a subscription when event subscribed so it can be unsubscribed', () => {
    const emitter = new EventEmitter()
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    const callback3 = jest.fn()

    const sub1 = emitter.subscribe('foo', callback1)
    const sub2 = emitter.subscribe('foo', callback2)

    sub1.unsubscribe()
    emitter.emit('foo')
    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()

    callback2.mockReset()
    const sub3 = emitter.subscribe('foo', callback3)
    sub2.unsubscribe()
    emitter.emit('foo')
    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).not.toHaveBeenCalled()
    expect(callback3).toHaveBeenCalled()

    callback3.mockReset()
    sub3.unsubscribe()
    emitter.emit('foo')
    expect(callback1).not.toHaveBeenCalled()
    expect(callback2).not.toHaveBeenCalled()
    expect(callback3).not.toHaveBeenCalled()
  })
})
