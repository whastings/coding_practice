var level = require('level'),
    directory = process.argv[2],
    db = level(directory),
    input = process.argv[3],
    data = JSON.parse(input);

for (var key in data) {
  if (data.hasOwnProperty(key)) {
    db.put(key, data[key]);
  }
}
