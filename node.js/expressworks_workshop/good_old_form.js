var express = require('express'),
    bodyParser = require('body-parser');

var port = process.argv[2];

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.post('/form', function(req, res) {
  var posted = req.body.str,
      reversed = posted.split('').reverse().join('');
  res.end(reversed);
});

app.listen(port);
