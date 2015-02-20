var async = require('async'),
    http = require('http');

var url1 = process.argv[2],
    url2 = process.argv[3];

async.each([url1, url2], function(url, next) {
  http.get(url, function(res) {
    res.on('end', function() {
      next();
    });
  }).on('error', function(error) {
    next(error);
  })
}, function(error) {
  if (error) {
    console.log(error);
  }
})
