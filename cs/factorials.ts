import range from './utils/range'

export const factorial = (num: number): number => {
  if (num < 2) {
    return 1
  }

  return num * factorial(num - 1)
}

export const factorialIterative = (num: number): number => {
  const numbers = range(2, num)

  return numbers.reduce((result, nextNum) => {
    return result * nextNum
  }, 1)
}
