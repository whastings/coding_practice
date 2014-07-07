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
