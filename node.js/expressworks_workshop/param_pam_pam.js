var express = require('express'),
    crypto = require('crypto');

var port = process.argv[2];

var app = express();

app.put('/message/:id', function(req, res) {
  var id = req.params.id,
      hashed;
  hashed = crypto.createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex');
  res.end(hashed);
})

app.listen(port);
