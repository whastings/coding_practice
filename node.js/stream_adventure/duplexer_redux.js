var duplexer = require('duplexer'),
    through = require('through');

module.exports = function(counter) {
  var countryCounts = {};
  var counterStream = through(function(object) {
    var country = object.country;
    if (countryCounts[country] === undefined) {
      countryCounts[country] = 0;
    }
    countryCounts[country] += 1;
  }, function() {
    counter.setCounts(countryCounts);
  });
  return duplexer(counterStream, counter);
};
