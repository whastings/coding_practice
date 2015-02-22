Function.prototype.bind = function(context) {
  var slice = Array.prototype.slice,
      partialArgs = slice.call(arguments, 1),
      func = this;
  return function() {
    return func.apply(context, partialArgs.concat(slice.call(arguments)));
  };
};

var func = function(bar, baz, qux) {
  return [this.foo, bar, baz, qux].join(' ');
};

var obj = {
  foo: 'foo'
};

var boundFunc = func.bind(obj, 'bar', 'baz');

console.log(boundFunc('qux'));
