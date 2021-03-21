import { useEffect, useRef } from 'react';

const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit | undefined = undefined,
) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(callback);
  const observerRef = useRef(
    new IntersectionObserver((entries) => {
      callbackRef.current(entries);
    }, options),
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

export default useIntersectionObserver;
