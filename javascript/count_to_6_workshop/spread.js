/* jshint esnext: true */

var inputs = process.argv.slice(2),
    min = Math.min(...inputs);

console.log(`The minimum of [${inputs}] is ${min}`);
