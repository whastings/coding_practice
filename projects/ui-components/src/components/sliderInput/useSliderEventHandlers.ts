import { MouseEventHandler, TouchEventHandler, useCallback } from 'react';

import useCallbackRef from '../../utils/useCallbackRef';

interface Result<T extends HTMLElement> {
  onMouseDown: MouseEventHandler<T>;
  onTouchStart: TouchEventHandler<T>;
}

function useSliderEventHandlers<T extends HTMLElement>(
  callback: (pointerPosition: { x: number; y: number }) => void,
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

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0];
      callbackRef.current({ x: touch.clientX, y: touch.clientY });
    },
    [callbackRef],
  );

  const handleTouchEnd = useCallback(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
  }, [handleTouchMove]);

  const handleTouchStart = useCallback(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  return { onMouseDown: handleMouseDown, onTouchStart: handleTouchStart };
}

export default useSliderEventHandlers;
