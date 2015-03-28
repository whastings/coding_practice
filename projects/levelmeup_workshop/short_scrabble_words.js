exports.init = function(db, words, callback) {
  var batch = db.batch();

  words.forEach(function(word) {
    var length = word.length,
        key = length + word;
    batch.put(key, word);
  });

  batch.write(callback);
};

exports.query = function(db, word, callback) {
  var length = word.length,
      key = length + word,
      words = [];

  var stream = db.createReadStream({
    start: key.replace('*', '!'),
    end: key.replace('*', '~')
  });

  stream
    .on('data', addWord)
    .on('error', handleError)
    .on('end', done);

  function addWord(word) {
    words.push(word.value);
  }

  function handleError(err) {
    stream.off('end', done);
    callback(err);
  }

  function done() {
    callback(null, words);
  }
};
