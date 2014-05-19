var crypto = require('crypto');

var pass = process.argv[2];

var decryptor = crypto.createDecipher('aes256', pass);

process.stdin.pipe(decryptor).pipe(process.stdout);
