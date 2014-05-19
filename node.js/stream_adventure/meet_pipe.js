var fs = require('fs');

var file = process.argv[2],
    fileStream = fs.createReadStream(file);

fileStream.pipe(process.stdout);
