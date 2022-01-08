import {
  MouseEventHandler,
  PointerEventHandler,
  TouchEventHandler,
  useCallback,
  useRef,
} from 'react';

import useCallbackRef from '../../utils/useCallbackRef';

interface NonPointerHandlers<T extends HTMLElement> {
  onMouseDown: MouseEventHandler<T>;
  onTouchStart: TouchEventHandler<T>;
}

interface PointerHandlers<T extends HTMLElement> {
  onPointerDown: PointerEventHandler<T>;
}

function findMatchingTouch(touches: TouchList, id: number): Touch | null {
  return Array.from(touches).find((touch) => touch.identifier === id) || null;
}

function useSliderEventHandlers<T extends HTMLElement>(
  callback: (pointerPosition: { x: number; y: number }) => void,
): NonPointerHandlers<T> | PointerHandlers<T> {
  const callbackRef = useCallbackRef(callback);
  const eventIDRef = useRef<number | null>(null);

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
      if (eventIDRef.current == null) {
        return;
      }

      const touch = findMatchingTouch(event.changedTouches, eventIDRef.current);
      if (touch != null) {
        callbackRef.current({ x: touch.clientX, y: touch.clientY });
      }
    },
    [callbackRef],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (
        eventIDRef.current == null ||
        findMatchingTouch(event.changedTouches, eventIDRef.current) == null
      ) {
        return;
      }

      eventIDRef.current = null;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    },
    [handleTouchMove],
  );

  const handleTouchStart: TouchEventHandler<T> = useCallback(
    (event) => {
      if (eventIDRef.current != null) {
        return;
      }

      eventIDRef.current = event.changedTouches[0].identifier;
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchcancel', handleTouchEnd);
    },
    [handleTouchEnd, handleTouchMove],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (event.pointerId === eventIDRef.current) {
        event.preventDefault();
        callbackRef.current({ x: event.clientX, y: event.clientY });
      }
    },
    [callbackRef],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      if (event.pointerId === eventIDRef.current) {
        eventIDRef.current = null;
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
      }
    },
    [handlePointerMove],
  );

  const handlePointerDown: PointerEventHandler<T> = useCallback(
    (event) => {
      if (eventIDRef.current != null) {
        return;
      }

      eventIDRef.current = event.pointerId;
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    },
    [handlePointerMove, handlePointerUp],
  );

  if (window.PointerEvent != null) {
    return { onPointerDown: handlePointerDown };
  }

  return {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  };
}

export default useSliderEventHandlers;
