var slice = Array.prototype.slice;

function curryN(fn, numArgs) {
  if (numArgs === undefined) {
    numArgs = fn.length;
  }

  return function curried(args) {
    args = args.concat(slice.call(arguments, 1));

    if (args.length === numArgs) {
      return fn.apply(null, args);
    }

    return curried.bind(null, args);
  }.bind(null, []);
}

module.exports = curryN;
