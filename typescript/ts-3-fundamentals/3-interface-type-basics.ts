import { HasEmail, HasPhoneNumber } from './1-basics'

// Type Alias lets you name a type
type StringOrNumber = string | number
type HasName = { name: string }
const hasName: HasName = { name: 'Will' }

// Type can describe a function
type SendEmail = (contact: HasEmail, message: string) => void
const sendEmail: SendEmail = (contact, message) => console.log('Sending email...')

// Interface can extend another interface
interface HasIntPhone extends HasPhoneNumber {
  countryCode: string,
}
const hasIntPhone: HasIntPhone = {
  name: 'Will',
  phoneNumber: '2223334444',
  countryCode: '01',
}
// Object of sub-interface can be passed where super-interface expected
const takesPhone = (objectWithPhone: HasPhoneNumber) => {}
takesPhone(hasIntPhone)

// Interface can describe a function
interface SendMessage {
  (contact: HasEmail | HasPhoneNumber, message: string): void
}
const sendMessage: SendMessage = (contact, message) => console.log('Sending message...')

// Interface can describe a constructor
interface ContactConstructor {
  new (name: string, email?: string, phoneNumber?: string): HasEmail | HasPhoneNumber
}

// Interface can describe an object used like a hash
interface PhoneNumberDict {
  // Important to make `undefined` a possibility so TS doesn't think every
  // possible key is safe.
  [numberName: string]: undefined | HasPhoneNumber,
}
const phoneNumberDict: PhoneNumberDict = {}
// phoneNumberDict.will.phoneNumber (Error)
if (phoneNumberDict.will) {
  phoneNumberDict.will.phoneNumber
}

// Interface can be re-opened and augmented
interface PhoneNumber {
  areaCode: number,
  number: number,
}
interface ContactNumbers {
  home: PhoneNumber,
}
interface ContactNumbers {
  work: PhoneNumber,
}
// const contactNumbers: ContactNumbers = { home: { areaCode: 111, number: 2223333} } (Error)

// Interface can have index signature in addition to specific keys
interface ContactNumbers {
  [numberName: string]: undefined | PhoneNumber,
}
const contactNumbers: ContactNumbers = {
  home: { areaCode: 111, number: 2223333 },
  work: { areaCode: 222, number: 3334444 },
}
contactNumbers.home.number // Definitely there
contactNumbers.work.number // Definitely there
// contactNumbers.mobile.number (Error: Maybe undefined)

// But interface can't describe primitive types
