var slice = Array.prototype.slice;

function Spy(target, method) {
  var spy = {
    count: 0
  };

  var implementation = target[method];
  target[method] = function() {
    spy.count += 1;
    return implementation.apply(target, arguments);
  };

  return spy;
}

module.exports = Spy;
