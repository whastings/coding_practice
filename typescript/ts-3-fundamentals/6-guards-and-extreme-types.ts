import { HasEmail } from "./1-basics"

// Top types can hold any value
// They are 'any` and `unknown`
const myAny: any = 10
const myUnknown: unknown = 'hello'
// You can do anything with `any`
myAny.foo.bar.baz
// But nothing with `unknown`
// myUnknown.foo (Error)

// Can use `any` when you don't care about the type of something
const logPromise = async (promise: Promise<any>) => {
  console.log(await promise)
}

// Type guards confirm a value is of a given type so you can use it as such
// `typeof` is a type guard good for primitives
if (typeof myUnknown === 'string') {
  myUnknown.split(' ')
}
// `instanceof` is a type guard good for objects
if (myUnknown instanceof Promise) {
  logPromise(myUnknown)
}

// User defined type guards are custom ones you create
const isHasEmail = (value: any): value is HasEmail => {
  // Should return true if value is type or false if it isn't
  return typeof value.name === 'string' && typeof value.email === 'string'
}
if (isHasEmail(myUnknown)) {
  myUnknown.email
}
// Example: Checking if something is not `undefined`
const isDefined = <T>(arg: T | undefined): arg is T => {
  return typeof arg !== 'undefined'
}
const arrayWithUndefined = [1, 2, undefined, 3]
const arrayWithoutUndefined = arrayWithUndefined.filter(isDefined)
// Can also have type guards that throw
function assertIsStringArray(array: any[]): asserts array is string[] {
  if (!Array.isArray(array)) {
    throw new Error('not an array!')
  }
  const strings = array.filter(i => typeof i === 'string')
  if (strings.length !== array.length) {
    throw new Error('not an array of strings')
  }
}
const anyArray: any[] = ['a', 'b', 'c']
assertIsStringArray(anyArray)
anyArray.map((el) => el.toUpperCase())

// Bottom Type can't hold a value
// `never` is TS's bottom type
// let neverValue: never = 4 (Error)
// An Exhaustive Conditional ends with a value as a `never`,
// as in, if the types are actually correct when the program
// runs, you should never get there. If you try to access the
// `never` value, TS will mark is as a compile error if you
// haven't handled every possible type of the value
const assertNever = (value: never): never => {
  throw new Error('Unexpected value: ' + value)
}
const value1 = 10 as string | number
if (typeof value1 === 'string') {
  value1 // is a string
} else if (typeof value1 === 'number') {
  value1 // is a number
} else {
  value1 // is a never
  assertNever(value1)
}
