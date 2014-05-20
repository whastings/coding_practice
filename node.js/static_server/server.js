var fs = require('fs'),
    http = require('http'),
    mime = require('mime'),
    path = require('path');

var port = process.argv[2] || 8080,
    directory = process.argv[3] || 'public';

directory = path.resolve(__dirname, directory);

var server = http.createServer(function(req, res) {
  if (!validMethod(req, res)) return;
  var file = directory + req.url;
  sendFileMeta(file, res, sendFile.bind(null, file, res));
});

server.listen(port);
console.log('Static server listening on port ' + port);


var sendFile = function(file, res) {
  res.statusCode = 200;
  var fileStream = fs.createReadStream(file);
  fileStream.pipe(res);
  fileStream.on('error', sendNotFound.bind(null, res));
};

var sendFileMeta = function(file, res, next) {
  var mimeType = mime.lookup(file);
  res.setHeader('Content-Type', mimeType);
  fs.stat(file, function(error, stats) {
    if (!error) {
      res.setHeader('Content-Length', stats.size);
    }
    next();
  });
};

var sendNotFound = function(res) {
  res.statusCode = 404;
  res.end('File not found.');
};

var validMethod = function(req, res) {
  if (req.method !== 'GET') {
    res.writeHead(
      405,
      {'Allow': 'GET'}
    );
    res.end('Unable to handle request method.');
    return false;
  }
  return true;
};
