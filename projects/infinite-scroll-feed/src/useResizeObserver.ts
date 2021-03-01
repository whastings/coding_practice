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
    if (elementRef.current != null) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      observerRef.current.disconnect();
    };
  });

  return elementRef;
};

export default useResizeObserver;
