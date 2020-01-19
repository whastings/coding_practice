const assert = require('assert');

const Robot = function(name) {
  // Enforce constructor invocation when `new` is forgotten:
  if (!(this instanceof Robot)) {
    return new Robot(name);
  }
  this.name = name;
};

const r1 = new Robot('Volts');
const r2 = Robot('Bolts');

assert.strictEqual(r1 instanceof Robot, true);
assert.strictEqual(r1.name, 'Volts');
assert.strictEqual(r1.constructor, Robot)
assert.strictEqual(r2 instanceof Robot, true);
assert.strictEqual(r2.name, 'Bolts');
assert.strictEqual(r2.constructor, Robot)

assert.strictEqual(r1.__proto__, Robot.prototype)
assert.strictEqual(Robot.prototype.constructor, Robot)

// Return arbitrary object:
const Robot2 = function(name) {
  return new Robot(name);
};

const r3 = new Robot2('Zappy');

assert.strictEqual(r3 instanceof Robot2, false);
assert.strictEqual(r3 instanceof Robot, true);
assert.strictEqual(r3.name, 'Zappy');
