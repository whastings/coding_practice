import { useCallback, useEffect, useRef } from 'react';

function useIntersectionObserver<TElement extends HTMLElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit,
): (element: TElement | null) => void {
  const callbackRef = useRef(callback);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // TODO: Allow changing options.
  const optionsRef = useRef(options);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect(); // eslint-disable-line react-hooks/exhaustive-deps
    };
  }, []);

  return useCallback((element) => {
    if (observerRef.current == null) {
      observerRef.current = new IntersectionObserver((entries) => {
        callbackRef.current(entries[0]);
      }, optionsRef.current);
    } else {
      observerRef.current.disconnect();
    }

    if (element != null) {
      observerRef.current.observe(element);
    }
  }, []);
}

export default useIntersectionObserver;
