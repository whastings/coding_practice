function *factorial(max) {
  var current = result = 1;

  while (current <= max) {
    result *= current;
    yield result;
    current += 1;
  }
}

for (var n of factorial(5)) {
  console.log(n);
}
