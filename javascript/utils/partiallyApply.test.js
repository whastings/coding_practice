import partiallyApply from './partiallyApply'

describe('partiallyApply()', () => {
  it('partially applies a function until all of its arguments are provided', () => {
    const spy = jest.fn()
    const fn = function(a, b, c, d) {
      spy(a, b, c, d)
      return a + b + c + d
    }
    const partiallyAppliedFn = partiallyApply(fn)

    const intermediateFn = partiallyAppliedFn(1)(2, 3)
    expect(spy).not.toHaveBeenCalled()

    expect(intermediateFn(4)).toEqual(10)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1, 2, 3, 4)

    expect(intermediateFn(5)).toEqual(11)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(1, 2, 3, 5)
  })
})
