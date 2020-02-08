var q = require('q');

var parsePromised = function(input) {
  var defer = q.defer(),
      result;

  try {
    result = JSON.parse(input);
    defer.resolve(result);
  } catch(error) {
    // Will go to the next available error handling function.
    defer.reject(error);
  }

  return defer.promise;
};

parsePromised(process.argv[2])
.then(console.log)
.then(null, console.log);
