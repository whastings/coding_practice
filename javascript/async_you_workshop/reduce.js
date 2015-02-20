var async = require('async'),
    http = require('http');

var url = process.argv[2] + '?number=';

async.reduce(['one', 'two', 'three'], 0, function(total, currentNum, next) {
  http.get(url + currentNum, function(res) {
    var body = '';
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      next(null, total + parseInt(body, 10));
    });
  }).on('error', next);
}, function(error, result) {
  if (error) {
    console.log(error);
  }
  console.log(result);
})
