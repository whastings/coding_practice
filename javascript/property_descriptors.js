"use strict";

var assert = require('assert');

var myObject = {};

Object.defineProperty(myObject, 'name', {
  get: function() {
    return this._name;
  },
  set: function(newName) {
    this._name = newName.toUpperCase();
  }
});

myObject.name = 'John Doe';
assert.strictEqual(myObject.name, 'JOHN DOE');


function Person(name) {
  Object.defineProperties(this, {
    name: {
      get: function() {
        return name;
      },
      set: function(newName) {
        name = newName.toUpperCase();
      }
    }
  });
}

var person = new Person('Bob');
assert.strictEqual(person.name, 'Bob');
person.name = 'Joe';
assert.strictEqual(person.name, 'JOE');


Object.defineProperties(Person.prototype, {
  email: {
    get: function() {
      return this._email.toLowerCase();
    },
    set: function(newEmail) {
      this._email = newEmail;
    }
  }
});

person.email = 'Will@Something.com';
assert.strictEqual(person.email, 'will@something.com');
assert.strictEqual(Person.prototype._email, undefined);
