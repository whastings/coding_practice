var assert = require('assert');

var truthy1 = 'I am Truth...y',
    truthy2 = 'Respect dis!',
    falsey1 = 0,
    falsey2 = '';

/* && */

// Last truthy value when both truthy.
assert.strictEqual(truthy1 && truthy2, truthy2);
// First falsey value.
assert.strictEqual(truthy1 && falsey1, falsey1);
assert.strictEqual(falsey1 && truthy1, falsey1);
assert.strictEqual(falsey1 && falsey2, falsey1);


/* || */

// First truthy value.
assert.strictEqual(truthy1 || truthy2, truthy1);
assert.strictEqual(truthy1 || falsey1, truthy1);
assert.strictEqual(falsey1 || truthy1, truthy1);
// Last falsey value when both falsey.
assert.strictEqual(falsey1 || falsey2, falsey2);
