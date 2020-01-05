export const fibonacci = (n: number): number => {
  if (n <= 2) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

export const fibonacciEfficient = (n: number): number => {
  const buildFibArray = (i: number, array: number[] = []): number[] => {
    if (i <= 1) {
      array.push(1, 1)
      return array
    }
    buildFibArray(i - 1, array)
    array.push(array[i - 1] + array[i - 2])
    return array
  }
  return buildFibArray(n - 1)[n - 1]
}
