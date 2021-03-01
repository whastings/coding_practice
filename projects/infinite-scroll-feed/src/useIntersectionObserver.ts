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
    if (elementRef.current != null) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      observerRef.current.disconnect();
    };
  });

  return elementRef;
};

export default useIntersectionObserver;
