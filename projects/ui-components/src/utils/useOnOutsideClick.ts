import { useCallback, useEffect, useRef } from 'react';

function useOnOutsideClick(
  callback: (node: Node) => void,
): React.MutableRefObject<HTMLElement | null> {
  const callbackRef = useRef(callback);
  const containerRef = useRef<HTMLElement | null>(null);

  const handleClick = useCallback((event: MouseEvent) => {
    const containerEl = containerRef.current;

    if (containerEl == null) {
      return;
    }

    if (event.target instanceof Node && !containerEl.contains(event.target)) {
      callbackRef.current(event.target);
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return containerRef;
}

export default useOnOutsideClick;
