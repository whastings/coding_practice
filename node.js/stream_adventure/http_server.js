var http = require('http'),
    through = require('through');

var upcaseStream = through(function(buffer) {
  this.queue(buffer.toString().toUpperCase());
});

http.createServer(function(request, response) {
  if (request.method === 'POST') {
    request.pipe(upcaseStream).pipe(response);
  }
  response.end();
}).listen(process.argv[2]);
