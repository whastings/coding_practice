function *upper(items) {
  for (var item of items) {
    try {
      yield item.toUpperCase();
    } catch(error) {
      yield null;
    }
  }
}

var badItems = ['a', 'B', 1, 'c'];

for (var item of upper(badItems)) {
  console.log(item);
}
