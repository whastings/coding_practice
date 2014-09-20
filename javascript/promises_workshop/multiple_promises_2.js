var q = require('q');

var defer1 = q.defer(),
    defer2 = q.defer(),
    promises = [defer1.promise, defer2.promise];

q.all(promises)
.spread(console.log);

setTimeout(function() {
  defer2.resolve('FTW');
  defer1.resolve('PROMISES');
}, 200);
