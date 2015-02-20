var express = require('express'),
    fs = require('fs');

var port = process.argv[2],
    filePath = process.argv[3];

var app = express();

app.get('/books', function(req, res) {
  fs.readFile(filePath, function(error, contents) {
    res.json(JSON.parse(contents.toString()));
  });
});

app.listen(port);
