var async = require('async'),
    http = require('http');

var url = process.argv[2],
    lastResponse = '',
    numReqs = 0;

async.whilst(
  function() {
    return lastResponse.indexOf('meerkat') === -1;
  },
  function(next) {
    http.get(url, function(res) {
      var body = '';
      res.on('data', function(data) {
        body += data;
      });
      res.on('end', function() {
        lastResponse = body;
        next();
      });
    }).on('error', next);
    numReqs += 1;
  },
  function(error) {
    if (error) {
      console.log(error);
    }
    console.log(numReqs);
  }
);
