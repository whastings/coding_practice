import { useDeferredValue, useState } from "react";
import PrimeNumbersList from "./PrimeNumbersList";

function UseDeferredValue() {
  const [numPrimes, setNumPrimes] = useState(0);
  const numPrimesDeferred = useDeferredValue(numPrimes);

  return (
    <main>
      <h1>useDeferredValue</h1>

      <form>
        <label htmlFor="num-primes">Num Primes</label>
        <input
          id="num-primes"
          onChange={(event) => setNumPrimes(Number(event.target.value))}
          type="number"
        />
      </form>

      <h2>Primes{numPrimes !== numPrimesDeferred && " (Loading)"}</h2>
      <PrimeNumbersList count={numPrimesDeferred} />
    </main>
  );
}

export default UseDeferredValue;
