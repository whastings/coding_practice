function reduce(array, callback, startVal, startIndex) {
  startIndex = startIndex || 0;

  startVal = callback(startVal, array[startIndex], startIndex, array);

  startIndex += 1;
  if (startIndex < array.length) {
    return reduce(array, callback, startVal, startIndex);
  }
  return startVal;
}

module.exports = reduce;
