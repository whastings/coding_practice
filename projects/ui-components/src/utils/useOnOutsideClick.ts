import { useCallback, useEffect, useRef } from 'react';

function useOnOutsideClick(
  callback: () => void,
): React.MutableRefObject<HTMLElement | null> {
  const callbackRef = useRef(callback);
  const containerRef = useRef<HTMLElement | null>(null);
  const isContainerMountedRef = useRef(false);

  const handleClick = useCallback((event: MouseEvent) => {
    const containerEl = containerRef.current;

    if (containerEl == null || !isContainerMountedRef.current) {
      return;
    }

    if (event.target instanceof Node && !containerEl.contains(event.target)) {
      callbackRef.current();
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  // Prevent click event that caused the container to render
  // from counting as an outside click
  useEffect(() => {
    if (containerRef.current != null) {
      isContainerMountedRef.current = true;
    } else {
      isContainerMountedRef.current = false;
    }
  });

  useEffect(() => {
    callbackRef.current = callback;
  });

  return containerRef;
}

export default useOnOutsideClick;
