/* jshint esnext: true */

"use strict";

var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function isPrime(num) {
  var sqrt = Math.sqrt(num);
  if (num !== 2 && num % 2 === 0) {
    return false;
  }
  for (var i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function* primeGenerator() {
  var nextNum = 2;
  while (true) {
    if (isPrime(nextNum)) {
      yield nextNum;
    }
    nextNum += 1;
  }
}

function play() {
  var generator = primeGenerator(),
      nextPrime;
  function playTurn(guess) {
    if (guess) {
      nextPrime = generator.next().value;
      if (parseInt(guess, 10) !== nextPrime) {
        console.log('Sorry, the next prime is ' + nextPrime);
        readline.close();
        return;
      }
      readline.question(
        'What is the next prime after ' + nextPrime + '? ',
        playTurn
      );
    } else {
      readline.question('What is the first prime? ', playTurn);
    }
  }
  playTurn();
}

play();
