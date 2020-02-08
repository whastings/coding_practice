var buffers = [];

process.stdin.on('data', function(buffer) {
  buffers.push(buffer);
});

process.stdin.on('end', function() {
  var combinedBuffers = Buffer.concat(buffers);
  console.log(combinedBuffers);
});
