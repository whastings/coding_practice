function askFoo() {
  return new Promise(function(resolve, reject) {
    resolve('foo');
  });
}

function makeFail() {
  return new Promise(function(resolve, reject) {
    reject('sad');
  });
}

function run(generator) {
  var iterator = generator(),
      yielded, promise;

  function success(result) {
    runPromise(result);
  }

  function failure(error) {
    iterator.throw(error);
  }

  function runPromise(nextVal) {
    yielded = iterator.next(nextVal);
    if (yielded.done) {
      return;
    }
    promise = yielded.value;
    promise.then(success, failure);
  }

  runPromise();
}

run(function *() {
  var foo = yield askFoo();
  console.log(foo);

  try {
    yield makeFail();
  } catch (error) {}
});
