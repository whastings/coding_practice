var through = require('through'),
    trumpet = require('trumpet');

var trumpetStream = trumpet(),
    htmlStream = trumpetStream.select('.loud').createStream();

htmlStream.pipe(through(function(buffer) {
  var text = buffer.toString().toUpperCase();
  this.queue(text);
})).pipe(htmlStream);
process.stdin.pipe(trumpetStream).pipe(process.stdout);
