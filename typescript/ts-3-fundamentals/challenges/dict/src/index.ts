export type Dict<T = any> = {
  [prop: string]: T,
}

// Array.prototype.map, but for Dict
type MapCallback<T, U> = (value: T) => U
export function mapDict<T, U>(dict: Dict<T>, callback: MapCallback<T, U>): Dict<U> {
  return Object.keys(dict)
    .filter((key) => dict[key] !== undefined)
    .reduce((newDict, key) => {
      newDict[key] = callback(dict[key])
      return newDict
    }, {} as Dict)
}

// Array.prototype.reduce, but for Dict
type ReduceCallback<T, U> = (value: T, accumulator: U) => U
export function reduceDict<T, U>(dict: Dict<T>, callback: ReduceCallback<T, U>, initialValue: U): U {
  return Object.keys(dict).reduce((accumulator, key) => {
    if (dict[key] === undefined) {
      return accumulator
    }
    return callback(dict[key], accumulator)
  }, initialValue)
}
