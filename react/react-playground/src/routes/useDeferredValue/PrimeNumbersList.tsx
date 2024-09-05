import { memo } from "react";
import PrimeNumber from "./PrimeNumber";

interface Props {
  count: number;
}

function PrimeNumbersList({ count }: Props) {
  return (
    <ul>
      {new Array(count).fill(null).map((_, i) => (
        <PrimeNumber nth={i + 1} />
      ))}
    </ul>
  );
}

export default memo(PrimeNumbersList);
