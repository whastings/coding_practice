import { useOptimistic, useState } from "react";

interface CounterProps {
  onIncrease: (newCount: number) => Promise<void>;
  value: { count: number; isUpdating: boolean };
}

function Counter({ onIncrease, value }: CounterProps) {
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    value,
    (_oldValue: number, newCount: number) => {
      return { count: newCount, isUpdating: true };
    }
  );

  const handleClick = async () => {
    const newCount = value.count + 1;
    setOptimisticValue(newCount);
    await onIncrease(newCount);
  };

  return (
    <div>
      <strong>Value: </strong>
      {optimisticValue.count}
      {optimisticValue.isUpdating && <span> (Saving...)</span>}
      <form action={handleClick}>
        <button type="submit">Increment</button>
      </form>
    </div>
  );
}

function UseOptimistic() {
  const [counterValue, setCounterValue] = useState({
    count: 1,
    isUpdating: false,
  });

  const updateCounterValue = async (newCount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (Math.random() < 0.5) {
      setCounterValue({ count: newCount, isUpdating: false });
    }
  };

  return (
    <div>
      <h1>useOptimistic</h1>
      <Counter onIncrease={updateCounterValue} value={counterValue} />
    </div>
  );
}

export default UseOptimistic;
