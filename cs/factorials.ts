export const factorial = (num: number): number => {
  if (num < 2) {
    return 1
  }

  return num * factorial(num - 1)
}
