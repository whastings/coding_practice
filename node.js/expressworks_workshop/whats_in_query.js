var express = require('express');

var port = process.argv[2];

var app = express();

app.get('/search', function(req, res) {
  var query = req.query,
      obj = {};
  for (var key in query) {
    if (query.hasOwnProperty(key)) {
      obj[key] = query[key];
    }
  }
  res.end(JSON.stringify(obj));
});

app.listen(port);
