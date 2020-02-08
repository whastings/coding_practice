/* jshint esnext: true */

module.exports = function exclaim(string, times = string.length) {
  return string + '!'.repeat(times);
};
