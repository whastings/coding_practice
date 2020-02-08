/* jshint esnext: true */

module.exports = function average(...numbers) {
  var sum = numbers.reduce((subtotal, number) => subtotal + number);
  return sum / numbers.length;
};
