import { useEffect, useRef } from 'react';

function usePreviousValue<TValue>(value: TValue): TValue {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
}

export default usePreviousValue;
