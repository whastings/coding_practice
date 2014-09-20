var qhttp = require('q-io/http');

qhttp.read('http://localhost:7000')
.then(function(buffer) {
  var id = buffer.toString();
  return qhttp.read('http://localhost:7001/' + id);
})
.then(function(buffer) {
  var object = JSON.parse(buffer);
  console.log(object);
})
.then(null, console.error)
.done();
