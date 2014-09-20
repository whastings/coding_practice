var qhttp = require('q-io/http'),
    _ = require('lodash'); // jshint ignore:line

qhttp.read('http://localhost:7000')
.then(_.bind(function(url, id) {
  return qhttp.read(url + id);
}, null, 'http://localhost:7001/'))
.then(
  _.compose(console.log, JSON.parse)
)
.then(null, console.error)
.done();
