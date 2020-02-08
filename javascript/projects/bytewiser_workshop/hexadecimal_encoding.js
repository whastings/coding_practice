var bytes = process.argv.slice(2);

var buffer = new Buffer(bytes.map(function(byte) {
  return parseInt(byte, 10);
}));
console.log(buffer.toString('hex'));
