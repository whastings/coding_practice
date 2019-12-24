// Generics parameterize types

// Interface can accept type param
interface WrappedValue<T> {
  value: T,
}
const wrappedValue: WrappedValue<string[]> = { value: [] }
// wrappedValue.value.push(2) (Error)

// Type param can have default value
interface Printer<T = string> {
  print: () => T,
}

// Functions can take type params
const resolveOrTimeout = <T>(promise: Promise<T>, timeout: number) => {
  return new Promise<T>((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error('time up')), timeout)

    promise.then((value) => {
      clearTimeout(timerId)
      resolve(value)
    })
  })
}
// Can omit type param when it can be inferred from argument
resolveOrTimeout<Response>(fetch(''), 2000) // fetch returns Promise<Response>
resolveOrTimeout(fetch(''), 2000)

// Type params can have constraints
// `extends` mean param must be assignable to a given type
// e.g. T must have `id` prop of type string
const arrayToDict = <T extends { id: string }>(
  array: T[]
): { [k: string]: T } => {
  return array.reduce((dict, element) => (
    { ...dict, [element.id]: element }
  ), {})
}
// Again, type param can be inferred
const myDict = arrayToDict([
  // Elements must have `id` prop, but can have other props
  { id: 'a', name: 'Will' },
  { id: 'b', name: 'Bob' },
  // { name: 'Joe' } (Error)
])

// Type params are scoped like variables in functions
const startTuple = <T>(a: T) => {
  return <U>(b: U): [T, U] => {
    return [a, b]
  }
}
const myTuple = startTuple('string')(10)
