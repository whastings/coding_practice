import { HasEmail, HasPhoneNumber } from './1-basics'

// Mapped Types let you look up types by key from an interface
interface CommunicationMethods {
  email: HasEmail,
  phone: HasPhoneNumber,
  fax: { fax: number },
}
// You can use them as an alternative to overloaded functions
const contactPerson = <K extends keyof CommunicationMethods>( // Type arg K is one of keys in interface CommunicationMethods
  method: K,
  contact: CommunicationMethods[K], // Look up type from interface using key `K`
) => {
  // ...
}
contactPerson('email', { name: 'Will', email: 'will@example.com' })
contactPerson('phone', { name: 'Will', phoneNumber: '1112223333' })
// contactPerson('email', { name: 'Will', phoneNumber: '1112223333' }) (ERROR)
// You can get all interface keys or all interface values using `keyof`
type CommunicationMethodKeys = keyof CommunicationMethods
type CommunicationMethodValues = CommunicationMethods[keyof CommunicationMethods]

// Type Queries return types of values
// Use `typeof` operator
let numberVar: number = 2
let numberVar2: typeof numberVar = 3

// Conditional Types let you create a type using a conditional
// Good for use with `infer`, which extracts the type of a type arg
type EventualType<T> =
  T extends Promise<infer S> ? // If T is a Promise, extract promise type arg as S
  S : // Resolve as S
  T // Otherwise if not Promise, pass through
let eventualNumberVar: EventualType<Promise<number>>
let eventualNumArrayVar: EventualType<number[]>
