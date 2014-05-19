var through = require('through');

var transformStream = through(function write(buffer) {
  this.queue(buffer.toString().toUpperCase());
});

process.stdin.pipe(transformStream).pipe(process.stdout);
