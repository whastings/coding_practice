import throttle from 'lodash.throttle';
import { useEffect, useRef } from 'react';

function useThrottle<T extends (...args: any) => any>(
  callback: T,
  wait: number,
) {
  const callbackRef = useRef(callback);
  const getThrottled = () =>
    throttle(function (...args: Parameters<T>): ReturnType<T> {
      return callbackRef.current.apply(undefined, args);
    }, wait);
  const throttledRef = useRef<ReturnType<typeof getThrottled> | null>(null);

  if (throttledRef.current == null) {
    throttledRef.current = getThrottled();
  }

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(
    () => () => {
      throttledRef.current?.cancel();
    },
    [],
  );

  return throttledRef.current;
}

export default useThrottle;
