'use strict'

const assignNewProperty = (object) => {
  try {
    object.baz = 'qux'
  } catch(e) {
    console.log(e.message)
  }
}

const assignExistingProperty = (object) => {
  try {
    object.foo = 'baz'
  } catch(e) {
    console.log(e.message)
  }
}

const deleteProperty = (object) => {
  try {
    delete object.foo
  } catch(e) {
    console.log(e.message)
  }
}

// Object.preventExtensions() disallows new properties
const object1 = { foo: 'bar' }
Object.preventExtensions(object1)
assignExistingProperty(object1) // Okay
assignNewProperty(object1) // Not okay
deleteProperty(object1) // Okay

// Object.seal also prevents property configuration
const object2 = { foo: 'bar' }
Object.seal(object2)
assignExistingProperty(object2) // Okay
assignNewProperty(object2) // Not okay
deleteProperty(object2) // Not okay

// Object.freeze also prevents property value modification
const object3 = { foo: 'bar' }
Object.freeze(object3)
assignExistingProperty(object3) // Not okay
assignNewProperty(object3) // Not okay
deleteProperty(object3) // Not okay
