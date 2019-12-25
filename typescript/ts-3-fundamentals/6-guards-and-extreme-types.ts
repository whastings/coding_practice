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
