import { MouseEventHandler, useCallback } from 'react';

import useCallbackRef from '../../utils/useCallbackRef';

interface Result<T extends HTMLElement> {
  onMouseDown: MouseEventHandler<T>;
}

function useSliderEventHandlers<T extends HTMLElement>(
  callback: (mousePosition: { x: number; y: number }) => void,
): Result<T> {
  const callbackRef = useCallbackRef(callback);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      callbackRef.current({ x: event.clientX, y: event.clientY });
    },
    [callbackRef],
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  return { onMouseDown: handleMouseDown };
}

export default useSliderEventHandlers;
