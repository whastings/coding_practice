import { HasEmail, HasPhoneNumber } from './1-basics'

// Rest params must be array type
const sum = (...nums: number[]): number => {
  return nums.reduce((sum, num) => sum + num, 0)
}
sum(1, 2, 3)

// Function overloading lets you specify different type combos for a function
function contactPeople(method: 'email', ...people: HasEmail[]): void
function contactPeople(method: 'phoneNumber', ...people: HasPhoneNumber[]): void
// Implementation must support types of all overload signatures
function contactPeople(method: 'email' | 'phoneNumber', ...people: HasEmail[] | HasPhoneNumber[]) {
  if (method === 'email') {
    (people as HasEmail[]).forEach(() => console.log('send email'))
  } else {
    (people as HasPhoneNumber[]).forEach(() => console.log('send text'))
  }
}
// You can only invoke function with allowed combos
contactPeople('email', { name: 'Will', email: 'will@example.com' })
contactPeople('phoneNumber', { name: 'Will', phoneNumber: '1112223333' })
// contactPeople('email', { name: 'Will', phoneNumber: '1112223333' }) (Error)

