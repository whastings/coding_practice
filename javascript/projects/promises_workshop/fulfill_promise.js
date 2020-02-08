var q = require('q');

var defer = q.defer(),
    promise = defer.promise;

promise.then(console.log);

setTimeout(function() {
  defer.resolve('RESOLVED!');
}, 300);
