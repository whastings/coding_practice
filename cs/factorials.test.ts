import { factorial } from './factorials'

describe('factorial', () => {
  it('computes factorial of a passed number', () => {
    expect(factorial(1)).toBe(1)
    expect(factorial(2)).toBe(2)
    expect(factorial(3)).toBe(6)
    expect(factorial(10)).toBe(3628800)
  })
})
