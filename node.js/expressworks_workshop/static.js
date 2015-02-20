var express = require('express');

var port = process.argv[2],
    indexFilePath = process.argv[3];

var app = express();
app.use(express.static(indexFilePath));

app.listen(port);
