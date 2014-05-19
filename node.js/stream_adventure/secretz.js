var combine = require('stream-combiner'),
    crypto = require('crypto'),
    through = require('through'),
    tar = require('tar'),
    zlib = require('zlib');

var cipher = process.argv[2],
    pass = process.argv[3];

var cipherStream = crypto.createDecipher(cipher, pass),
    tarStream = tar.Parse();

var openStream = combine(
  cipherStream,
  zlib.createGunzip(),
  tarStream
);

tarStream.on('entry', function(entry) {
  if (entry.type !== 'File') {
    return;
  }

  var md5Sum = crypto.createHash('md5');
  entry.pipe(through(function(buffer) {
    md5Sum.update(buffer);
  }, function() {
    var hash = md5Sum.digest('hex');
    var output = hash + ' ' + entry.path + '\n';
    process.stdout.write(output);
  }));
});

process.stdin.pipe(openStream);
