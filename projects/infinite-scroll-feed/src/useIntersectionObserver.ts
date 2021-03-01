import { useEffect, useRef } from 'react';

const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit | undefined,
) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(callback);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (elementRef.current == null) {
      throw new Error('Element ref not set');
    }

    const observer = new IntersectionObserver((entries) => {
      callbackRef.current(entries);
    }, options);
    observerRef.current = observer;
    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observerRef.current?.unobserve(elementRef.current);
      }
    };
  }, []);

  return elementRef;
};

export default useIntersectionObserver;
