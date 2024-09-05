function calcNthPrime(nth: number): number {
  let numPrimes = 0;
  let currentPrime = 1;
  let n = 1;

  outer: while (numPrimes < nth) {
    n += 1;
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        continue outer;
      }
    }
    currentPrime = n;
    numPrimes += 1;
  }

  return currentPrime;
}

interface Props {
  nth: number;
}

function PrimeNumber({ nth }: Props) {
  const prime = calcNthPrime(nth);

  return <li>{prime}</li>;
}

export default PrimeNumber;
