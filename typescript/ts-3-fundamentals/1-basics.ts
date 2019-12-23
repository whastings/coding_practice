// With `const`, variable's type is it's literal value (a Literal Type)
const constVariable = 'hello world' // Type: 'hello world'
const constObject = { foo: 'bar' } // Type: { foo: string }

// With `let`, you can separate declaration from assignment
// If no type specified, will be `any`
let anyVar
anyVar = 10
anyVar = 'abc'
let numVar: number
numVar = 10
// numVar = 'abc' (ERROR)

// Array can only contain one kind of type
const array: number[] = []
array.push(10)
// array.push('abc') (ERROR)
const inferredArray = [10] // Type: number[]

// Tuple is array of fixed length and potentially different types
// but always in same order
const tuple: [number, string, string, number] = [ // Always number, two strings, and another number
  123,
  'Fake St.',
  'CA, USA',
  12345,
]
// Must declare tuple type, or else TS thinks it's just an array
const notTuple = [1, 2, 3] // Type: number[]

// Object types are like object literals
// Properties are required by default
// Suffix with `?` to make optional
// Only specified properties are allowed
let object: { firstName: string, lastName: string, phoneNumber?: string }
object = {
  firstName: 'Will',
  lastName: 'Hastings',
  // foobar: 'baz', (ERROR)
}
// Interface is like type
interface Person {
  firstName: string,
  lastName: string,
  phoneNumber?: string,
}
const object2: Person = {
  firstName: 'Will',
  lastName: 'Hastings',
}

// Intersection type gives you the properties two types have in common
interface HasEmail {
  name: string,
  email: string,
}
interface HasPhoneNumber {
  name: string,
  phoneNumber: string,
}
const intersectionContactInfo: HasEmail | HasPhoneNumber = Math.random() > 0.5 ?
  { name: 'Will', email: 'will@example.com' } : { name: 'Will', phoneNumber: '1112223333' }
// So you can only access the common properties
intersectionContactInfo.name
// intersectionContactInfo.email (Error)

// Union type gives you all the properties of both types
// and so you must provide values for all
const unionContactInfo: HasEmail & HasPhoneNumber = {
  name: 'Will',
  email: 'will@example.com',
  phoneNumber: '1112223333'
}
