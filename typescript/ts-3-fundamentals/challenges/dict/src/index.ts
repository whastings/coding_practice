export type Dict<T = any> = {
  [prop: string]: T | undefined,
}

// Array.prototype.map, but for Dict
type MapCallback<T, U> = (value: T) => U
export function mapDict<T, U>(dict: Dict<T>, callback: MapCallback<T, U>): Dict<U> {
  return Object.keys(dict)
    .reduce((newDict, key) => {
      const value = dict[key]
      if (value === undefined) {
        return newDict
      }
      newDict[key] = callback(value)
      return newDict
    }, {} as Dict)
}

// Array.prototype.reduce, but for Dict
type ReduceCallback<T, U> = (value: T, accumulator: U) => U
export function reduceDict<T, U>(dict: Dict<T>, callback: ReduceCallback<T, U>, initialValue: U): U {
  return Object.keys(dict).reduce((accumulator, key) => {
    const value = dict[key]
    if (value === undefined) {
      return accumulator
    }
    return callback(value, accumulator)
  }, initialValue)
}
