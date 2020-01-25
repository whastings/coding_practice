type MemoizableFunction<A, R> = (arg: A) => R

const memoize = <A, R>(fn: MemoizableFunction<A, R>): MemoizableFunction<A, R> => {
  const cache = new Map<A, R>()

  return function memoized(arg: A): R {
    if (cache.has(arg)) {
      return cache.get(arg)!
    }

    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

export default memoize
