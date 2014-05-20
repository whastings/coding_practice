var combine = require('stream-combiner'),
    split = require('split'),
    through = require('through'),
    zlib = require('zlib');

module.exports = function() {
  var currentGenre;

  var serializeGenre = function() {
    return JSON.stringify(currentGenre) + '\n';
  };

  var bookStream = through(function(buffer) {
    var content = buffer.toString();
    if (content === '') return;
    var row = JSON.parse(content);
    if (row.type === 'genre') {
      if (currentGenre) {
        this.queue(serializeGenre());
      }
      currentGenre = {name: row.name, books: []};
    } else if (row.type === 'book') {
      currentGenre.books.push(row.name);
    }
  }, function() {
    if (currentGenre) this.queue(serializeGenre());
    this.queue(null);
  });

  return combine(
    split(),
    bookStream,
    zlib.createGzip()
  );
};
