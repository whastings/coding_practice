var q = require('q');

var all = function(promises) {
  var defer = q.defer(),
      allDonePromise = defer.promise,
      doneCount = 0,
      results = [];

  var handleSuccess = function(index, result) {
    results[index] = result;
    doneCount += 1;
    if (doneCount === promises.length) {
      defer.resolve(results);
    }
  };

  var handleError = function(error) {
    defer.reject(error);
  };

  promises.forEach(function(promise, index) {
    promise.then(handleSuccess.bind(null, index), handleError);
  });

  return allDonePromise;
};

var defer1 = q.defer(),
    defer2 = q.defer(),
    promises = [defer1.promise, defer2.promise];

all(promises)
.then(console.log);

setTimeout(function() {
  defer2.resolve('FTW');
  defer1.resolve('PROMISES');
}, 200);
