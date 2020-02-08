/* jshint esnext: true */

var inputs = process.argv.slice(2);

var result = inputs.map(input => input.charAt(0))
  .reduce((partialResult, input) => partialResult + input);

console.log(`[${inputs}] becomes "${result}"`);
