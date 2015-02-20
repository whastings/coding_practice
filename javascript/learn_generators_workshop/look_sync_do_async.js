var fs = require('fs');

function run(generator) {
  var iterator = generator(go);

  function go(error, result) {
    if (error) {
      iterator.throw(error);
    } else {
      iterator.next(result);
    }
  }

  go();
}

run(function *(done) {
  var dirFiles, firstFile;

  try {
    dirFiles = yield fs.readdir('NoNoNoNo', done); // No such dir
    firstFile = dirFiles[0];
  } catch (error) {
    firstFile = null;
  }

  console.log(firstFile);
})
