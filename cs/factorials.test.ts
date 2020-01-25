import { factorial, factorialIterative } from './factorials'

describe('factorial', () => {
  it('computes factorial of a passed number', () => {
    expect(factorial(1)).toBe(1)
    expect(factorial(2)).toBe(2)
    expect(factorial(3)).toBe(6)
    expect(factorial(10)).toBe(3628800)
  })
})

describe('factorialIterative', () => {
  it('computes factorial of a passed number', () => {
    expect(factorialIterative(1)).toBe(1)
    expect(factorialIterative(2)).toBe(2)
    expect(factorialIterative(3)).toBe(6)
    expect(factorialIterative(10)).toBe(3628800)
  })
})
