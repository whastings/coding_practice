var log = console.log,
    slice = Array.prototype.slice;

function logger(namespace) {
  return function() {
    var args = slice.call(arguments);
    args.unshift(namespace);
    log.apply(console, args);
  };
}

module.exports = logger;
