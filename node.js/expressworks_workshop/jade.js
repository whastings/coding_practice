var express = require('express'),
    path = require('path');

var port = process.argv[2],
    viewsPath = path.join(__dirname, 'views');

var app = express();
app.set('view engine', 'jade');
app.set('views', viewsPath);

app.get('/home', function(req, res) {
  res.render('index', {date: new Date().toDateString()});
});

app.listen(port);
