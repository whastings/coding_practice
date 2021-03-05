import { useEffect, useRef } from 'react';

const useResizeObserver = (
  callback: (entries: ResizeObserverEntry[]) => void,
) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(callback);
  const observerRef = useRef(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      callbackRef.current(entries);
    }),
  );

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const observer = observerRef.current;

    if (elementRef.current != null) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  });

  return elementRef;
};

export default useResizeObserver;
