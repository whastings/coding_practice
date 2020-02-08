function repeat(operation, times) {
  if (times < 1) {
    return;
  }

  operation();

  repeat(operation, times - 1);
}

module.exports = repeat;
