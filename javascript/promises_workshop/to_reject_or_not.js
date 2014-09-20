var q = require('q');

var defer = q.defer(),
    promise = defer.promise;

promise.then(console.log, console.log);

defer.resolve('I FIRED');

defer.reject('I DID NOT FIRE'); // Ignored.
