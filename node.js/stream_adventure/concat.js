var concatStream = require('concat-stream');

var reverseStream = concatStream(function(buffer) {
  buffer = buffer.toString();
  process.stdout.write(buffer.split('').reverse().join('') + '\n');
});

process.stdin.pipe(reverseStream);
