var async = require('async'),
    http = require('http');

var url1 = process.argv[2],
    url2 = process.argv[3];

async.map([url1, url2], function(url, next) {
  http.get(url, function(res) {
    var body = '';
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      next(null, body);
    });
  }).on('error', function(error) {
    next(error);
  });
}, function(error, responses) {
  if (error) {
    console.log(error);
  }
  console.log(responses);
})
