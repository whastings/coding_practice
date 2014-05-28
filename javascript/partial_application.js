"use strict";

var applyPartially = function(func, context) {
  var arity = func.length,
      args = [];
  context = context || null;
  return function partialApplication() {
    args = args.concat(Array.prototype.slice.call(arguments));
    if (args.length === arity) {
      return func.apply(context, args);
    }
    return partialApplication;
  };
};

var testObject = {
  num: 4,
  sumThree: function(num1, num2, num3) {
    return this.num + num1 + num2 + num3;
  }
};

var sumThreePartial = applyPartially(testObject.sumThree, testObject);
var sum = sumThreePartial(1)(2)(3);

console.log(sum === 10);
