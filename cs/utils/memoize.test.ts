import memoize from './memoize'

describe('memoize', () => {
  it('caches the result of a function', () => {
    const fn = jest.fn().mockImplementation((num: number) => num + 1)

    const memoizedFn = memoize(fn)

    expect(memoizedFn(1)).toEqual(2)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(memoizedFn(1)).toEqual(2)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(2)).toEqual(3)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(memoizedFn(2)).toEqual(3)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
