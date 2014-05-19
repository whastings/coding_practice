var binarySearch = function(array, target) {
  if (array.length === 0 || (array.length === 1 && array[0] !== target)) {
    return -1;
  }
  var middle = Math.floor(array.length / 2);
  if (array[middle] === target) {
    return middle;
  }
  if (target < array[middle]) {
    return binarySearch(array.slice(0, middle), target);
  }
  var result = binarySearch(array.slice(middle + 1), target);
  return (result === -1) ? -1 : result + 1 + middle;
};

console.log(binarySearch([1, 4, 7, 8, 11, 13, 19], 13)); // Should be 5.
