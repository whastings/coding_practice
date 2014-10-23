/* jshint esnext: true */

var name = process.argv[2];

var greeting = `Hello, ${name}!
Your name lowercased is "${name.toLowerCase()}".`

console.log(greeting);
