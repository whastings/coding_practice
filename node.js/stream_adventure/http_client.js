var request = require('request');

var target = 'http://localhost:8000',
    requestStream = request.post(target);

process.stdin.pipe(requestStream).pipe(process.stdout);
