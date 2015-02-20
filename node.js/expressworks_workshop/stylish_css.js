var express = require('express'),
    path = require('path'),
    stylus = require('stylus');

var port = process.argv[2],
    publicPath = path.join(__dirname, 'public');

var app = express();
app.use(stylus.middleware(publicPath));
app.use(express.static(publicPath));

app.listen(port);
