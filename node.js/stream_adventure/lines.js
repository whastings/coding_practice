var split = require('split'),
    through = require('through');

var lineCount = 1;

var lineStream = through(function(buffer) {
  buffer = buffer.toString();
  var result = (lineCount % 2 === 0) ? buffer.toUpperCase()
    : buffer.toLowerCase();
  this.queue(result + '\n');
  lineCount += 1;
});

process.stdin.pipe(split()).pipe(lineStream).pipe(process.stdout);
