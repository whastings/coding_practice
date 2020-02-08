// A promise can never resolve more than once.

var q = require('q');

var throwError = function() {
  throw new Error('OH NOES');
};

var iterate = function(num) {
  console.log(num);
  return num + 1;
};

q.fcall(iterate, 1)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(throwError)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
// This call only provides an error handler, acting like a catch in
// a try..catch. Always provide an error handler at the end of a
// promise chain to catch any errors that come up in the chain.
.then(null, console.log);
