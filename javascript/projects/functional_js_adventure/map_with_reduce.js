module.exports = function arrayMap(array, fn) {
  return array.reduce(function(mappedArray, currentEl) {
    mappedArray.push(fn(currentEl));
    return mappedArray;
  }, []);
};
