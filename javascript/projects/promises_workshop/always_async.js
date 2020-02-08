var q = require('q');

var defer = q.defer(),
    promise = defer.promise;

promise.then(console.log);

// Invokes promise callback asynchronously, on next turn of event loop.
defer.resolve('SECOND');

console.log('FIRST');
