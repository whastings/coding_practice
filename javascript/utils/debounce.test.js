import debounce from './debounce'
import wait from './wait'

describe('debounce()', () => {
  it('holds off on running a function until N ms after it was last called', async () => {
    const fn = jest.fn()
    const debouncedFn = debounce(fn, 100)
    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    await wait(98)
    expect(fn).not.toHaveBeenCalled()

    debouncedFn()
    await wait(99)
    expect(fn).not.toHaveBeenCalled()

    await wait(1)
    expect(fn).toHaveBeenCalled()
  })

  it('passes along arguments from the last call', async () => {
    const fn = jest.fn()
    const debouncedFn = debounce(fn, 100)
    debouncedFn('foo', 'bar')
    await wait(1)
    debouncedFn('baz', 'qux')
    await wait(100)

    expect(fn).not.toHaveBeenCalledWith('foo', 'bar')
    expect(fn).toHaveBeenCalledWith('baz', 'qux')
  })

  it('invokes the function with the same context of the last call', async () => {
    const obj1 = {}
    const obj2 = {}
    const receivedContexts = []
    const fn = function() {
      receivedContexts.push(this)
    }
    const debouncedFn = debounce(fn, 100)

    debouncedFn.call(obj1)
    await wait(1)
    debouncedFn.call(obj2)
    await wait(100)

    expect(receivedContexts.length).toEqual(1)
    expect(receivedContexts[0]).toBe(obj2)
  })
})
