module.exports = function(db, date, callback) {
  var count = 0;

  var stream = db.createReadStream({start: date});
  stream.on('data', function() {
    count += 1;
  });

  stream.on('error', function(err) {
    callback(err);
  });

  stream.on('end', function() {
    callback(null, count);
  });
};
