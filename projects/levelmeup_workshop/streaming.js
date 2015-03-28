var level = require('level'),
    directory = process.argv[2],
    db = level(directory),
    stream = db.createReadStream();

stream.on('data', function(entry) {
  console.log(entry.key + '=' + entry.value);
});
