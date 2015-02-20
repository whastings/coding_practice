process.stdin.on('data', function(buffer) {
  var byte, length, i;

  for (i = 0, length = buffer.length; i < length; i++) {
    byte = buffer[i];
    if (byte === 46) {
      buffer.write('!', i, 1);
    }
  }

  console.log(buffer);
});
