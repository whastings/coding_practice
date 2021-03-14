import { useEffect, useMemo, useRef } from 'react';
import throttle from 'lodash.throttle';

const useScrollListener = (callback: (event: Event) => void) => {
  const callbackRef = useRef(callback);

  const listener = useMemo(
    () =>
      throttle((event: Event) => {
        callbackRef.current(event);
      }, 300),
    [],
  );

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, [listener]);
};

export default useScrollListener;
