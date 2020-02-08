function duckCount() {
  var args = Array.prototype.slice.call(arguments),
      hasOwnProperty = Object.prototype.hasOwnProperty;

  return (function counter(index, array) {
    var value = (hasOwnProperty.call(array[index], 'quack'));

    index += 1;
    if (index < array.length) {
      return value + counter(index, array);
    }
    return value;
  })(0, args);
}

module.exports = duckCount;
