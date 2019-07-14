const fakeExpensiveOperation = (seconds) => {
  const ms = seconds * 1000;
  const startTime = Date.now();
  while (Date.now() - startTime < ms) {}
}

export default fakeExpensiveOperation;
