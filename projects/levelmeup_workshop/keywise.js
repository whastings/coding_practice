var level = require('level'),
    directory = process.argv[2],
    db = level(directory, {valueEncoding: 'json'}),
    data = require(process.argv[3]);

var batch = db.batch();

data.forEach(function(entry) {
  var key = entry.type === 'repo' ? entry.user + '!' + entry.name
    : entry.name;
  batch.put(key, entry);
});

batch.write();
