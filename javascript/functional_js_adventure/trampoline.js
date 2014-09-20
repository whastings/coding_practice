function repeat(operation, num) {
  if (num <= 0) {
    return;
  }
  operation();
  return repeat.bind(null, operation, num - 1);
}

function trampoline(fn) {
  var result = fn;
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}

module.exports = function(operation, num) {
  return trampoline(repeat.bind(null, operation, num));
};
