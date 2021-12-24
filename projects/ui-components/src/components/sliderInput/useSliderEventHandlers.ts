import {
  MouseEventHandler,
  PointerEventHandler,
  TouchEventHandler,
  useCallback,
} from 'react';

import useCallbackRef from '../../utils/useCallbackRef';

interface NonPointerHandlers<T extends HTMLElement> {
  onMouseDown: MouseEventHandler<T>;
  onTouchStart: TouchEventHandler<T>;
}

interface PointerHandlers<T extends HTMLElement> {
  onPointerDown: PointerEventHandler<T>;
}

function useSliderEventHandlers<T extends HTMLElement>(
  callback: (pointerPosition: { x: number; y: number }) => void,
): NonPointerHandlers<T> | PointerHandlers<T> {
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

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      event.preventDefault();
      callbackRef.current({ x: event.clientX, y: event.clientY });
    },
    [callbackRef],
  );

  const handlePointerUp = useCallback(() => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);
  }, [handlePointerMove]);

  const handlePointerDown = useCallback(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  }, [handlePointerMove, handlePointerUp]);

  if (window.PointerEvent != null) {
    return { onPointerDown: handlePointerDown };
  }

  return {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  };
}

export default useSliderEventHandlers;
