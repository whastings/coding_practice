var level = require('level'),
    directory = process.argv[2],
    db = level(directory),
    x = 0,
    entries = [];

function getEntry() {
  var key = 'key' + x;

  if (x > 100) {
    return printEntries();
  }

  db.get(key, function(err, value) {
    if (err) {
      if (!err.notFound) throw err;
    } else {
      entries.push({key: key, value: value});
    }
    x += 1;
    getEntry();
  });
}

function printEntries() {
  entries.forEach(function(entry) {
    console.log(entry.key + '=' + entry.value);
  });
}

getEntry();
