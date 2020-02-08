function *range(from, to) {
  while (from <= to) {
    yield from;
    from += 1;
  }
};

for (var r of range(5, 10)) {
  console.log(r);
}
