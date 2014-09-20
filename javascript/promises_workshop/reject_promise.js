var q = require('q');

var defer = q.defer(),
    promise = defer.promise;

promise.then(console.log, function(error) {
  console.log(error.message);
});

setTimeout(function() {
  var error = new Error('REJECTED!');
  defer.reject(error);
});
