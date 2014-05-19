var mergeSort = function(array) {
  if (array.length <= 1) {
    return array;
  }

  var middle = Math.floor(array.length / 2);
  var left = array.slice(0, middle);
  var right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

var merge = function(left, right) {
  var result = [];

  while(left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return result.concat(left).concat(right);
};

console.log(mergeSort([5, 3, 2, 19, 15, 25, 7, 9]));
