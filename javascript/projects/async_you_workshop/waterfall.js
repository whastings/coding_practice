var fs = require('fs'),
    http = require('http'),
    async = require('async');

var filePath = process.argv[2];

async.waterfall([
  function(next) {
    fs.readFile(filePath, next);
  },
  function(fileContents, next) {
    var url = fileContents.toString();
    http.get(url, function(response) {
      next(null, response);
    }).on('error', function(error) {
      next(error);
    });
  },
  function(response) {
    var body = '';
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      console.log(body);
    });
  }
]);
