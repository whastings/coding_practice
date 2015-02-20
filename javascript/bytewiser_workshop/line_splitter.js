var fs = require('fs');

var filePath = process.argv[2];

fs.readFile(filePath, function(error, buffer) {
  var lineBuffers = [],
      bufferStart = 0,
      length, i;

  for (i = 0, length = buffer.length; i < length; i++) {
    if (String.fromCharCode(buffer[i]) === '\n') {
      lineBuffers.push(buffer.slice(bufferStart, i));
      bufferStart = i + 1;
    }
  }
  lineBuffers.push(buffer.slice(bufferStart, buffer.length));

  lineBuffers.forEach(function(lineBuffer) {
    console.log(lineBuffer);
  })
});
