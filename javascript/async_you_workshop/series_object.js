var async = require('async'),
    http = require('http');

var url1 = process.argv[2],
    url2 = process.argv[3];

function request(url, callback) {
  http.get(url, function(response) {
    var body = '';
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      callback(null, body);
    });
  }).on('error', function(error) {
    callback(error);
  });
}

async.series({
  requestOne: function(callback) {
    request(url1, callback);
  },
  requestTwo: function(callback) {
    request(url2, callback);
  }
}, function(error, result) {
  console.log(result);
});
