const assert = require('assert')

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

const person = new Person('Will', 'Hastings')
assert.ok(person instanceof Person)
assert.strictEqual(person.__proto__, Person.prototype)
assert.strictEqual(person.constructor, Person)
assert.throws(() => Person('Will', 'Hastings'))
