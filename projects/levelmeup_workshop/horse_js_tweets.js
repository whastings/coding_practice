module.exports = function(db, date, callback) {
  var tweets = [];

  var stream = db.createReadStream({start: date, end: date + '\xff'})
    .on('data', processEntry)
    .on('error', handleError)
    .on('end', handleEnd);

  function processEntry(entry) {
    tweets.push(entry.value);
  }

  function handleError(err) {
    stream.off('end', handleEnd);
    callback(err);
  }

  function handleEnd() {
    callback(null, tweets);
  }
};
