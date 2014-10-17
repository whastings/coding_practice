var assert = require('assert');

var Robot = function(name, type) {
  // More internal state:
  var age = 0,
      lastCharge,
      memory = 1024;

  // Public API
  var api = {
    charge: function() {
      lastCharge = Date.now();
    },
    getAge: function() {
      return age;
    },
    getLastCharge: function() {
      return lastCharge;
    },
    getMemory: function() {
      return memory;
    },
    getName: function() {
      return name;
    },
    getType: function() {
      return type;
    },
    upgrade: function() {
      age += 1;
      memory += 512;
    }
  };

  return api;
};

var r1 = Robot('Volts', 'Driver'),
    r2 = Robot('Bolts', 'Garbage Disposal');

assert.strictEqual(r1.getName(), 'Volts');
assert.strictEqual(r1.getAge(), 0);
assert.strictEqual(r1.getLastCharge(), undefined);
assert.strictEqual(r1.getMemory(), 1024);
assert.strictEqual(r1.getType(), 'Driver');

assert.strictEqual(r2.getName(), 'Bolts');
assert.strictEqual(r2.getAge(), 0);

r2.charge();
r2.upgrade();

assert(!r1.getLastCharge());
assert.strictEqual(r1.getAge(), 0);
assert.strictEqual(r1.getMemory(), 1024);

assert(r2.getLastCharge());
assert.strictEqual(r2.getAge(), 1);
assert.strictEqual(r2.getMemory(), 1536);
