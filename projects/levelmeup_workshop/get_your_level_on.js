var level = require('level'),
    args = process.argv,
    directory = args[2],
    key = args[3],
    db = level(directory);

db.get(key, function(err, value) {
  if (err) throw err;
  console.log(value);
});
