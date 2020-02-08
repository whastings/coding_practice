function *flatten(array) {
  for (var el of array) {
    Array.isArray(el) ? yield *flatten(el) : yield el;
  }
}

var array = [1, [2, [3, 4], 5], 6];
for (var el of flatten(array)) {
  console.log(el);
}
