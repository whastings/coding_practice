import { fibonacci, fibonacciEfficient } from './fibonacci'

describe('fibonacci', () => {
  it('outputs Nth number of fibonacci sequence', () => {
    expect(fibonacci(1)).toBe(1)
    expect(fibonacci(2)).toBe(1)
    expect(fibonacci(3)).toBe(2)
    expect(fibonacci(4)).toBe(3)
    expect(fibonacci(5)).toBe(5)
    expect(fibonacci(20)).toBe(6765)
  })
})

describe('fibonacciEfficient', () => {
  it('outputs Nth number of fibonacci sequence', () => {
    expect(fibonacciEfficient(1)).toBe(1)
    expect(fibonacciEfficient(2)).toBe(1)
    expect(fibonacciEfficient(3)).toBe(2)
    expect(fibonacciEfficient(4)).toBe(3)
    expect(fibonacciEfficient(5)).toBe(5)
    expect(fibonacciEfficient(20)).toBe(6765)
  })
})
