process.stdin.once('data', function(buffer) {
  var array = new Uint8Array(buffer);
  console.log(JSON.stringify(array));
});
