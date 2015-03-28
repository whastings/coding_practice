var level = require('level'),
    fs = require('fs'),
    directory = process.argv[2],
    filePath = process.argv[3],
    db = level(directory);

db.on('ready', function() {
  fs.readFile(filePath, function(err, contents) {
    var batch = db.batch();
    if (err) throw err;

    contents = contents.toString().split('\n');
    contents.forEach(function(line) {
      var data = line.split(','),
          type = data[0],
          key = data[1],
          value = data[2];
      if (type === 'del') {
        batch.del(key);
      } else {
        batch.put(key, value);
      }
    });
    batch.write();
  });
});
