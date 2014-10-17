var assert = require('assert');

// Enforce constructor invocation when `new` is forgotten:
var Robot = function(name) {
  if (!(this instanceof Robot)) {
    return new Robot(name);
  }
  this.name = name;
};

var r1 = new Robot('Volts'),
    r2 = Robot('Bolts');

assert.strictEqual(r1 instanceof Robot, true);
assert.strictEqual(r1.name, 'Volts');
assert.strictEqual(r2 instanceof Robot, true);
assert.strictEqual(r2.name, 'Bolts');

// Return arbitrary object:
var Robot2 = function(name) {
  return new Robot(name);
};

var r3 = new Robot2('Zappy');

assert.strictEqual(r3 instanceof Robot2, false);
assert.strictEqual(r3 instanceof Robot, true);
assert.strictEqual(r3.name, 'Zappy');
