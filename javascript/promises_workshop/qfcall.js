var q = require('q');

var parse = function(string) {
  return JSON.parse(string);
};

// Wraps invocation of function in a promise.
q.fcall(parse, process.argv[2])
.then(console.log, console.log);
