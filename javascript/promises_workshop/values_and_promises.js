var q = require('q');

var defer = q.defer(),
    promise = defer.promise;

var attachTitle = function(string) {
  return 'DR. ' + string;
};

promise.then(function(string) {
  // Promise mechanism automatically wraps returned value in a promise.
  return attachTitle(string);
})
.then(console.log);

defer.resolve('MANHATTAN');
