import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

function useAnimatePosition<TElement extends HTMLElement>(
  dependency: unknown,
): MutableRefObject<TElement> {
  const elementRef = useRef<TElement>();
  const lastPositionRef = useRef<DOMRect | void>();
  const shouldPlayRef = useRef(false);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (element == null) {
      throw new Error('Missing element ref!');
    }

    const currentPosition = element.getBoundingClientRect();
    const lastPosition = lastPositionRef.current;
    lastPositionRef.current = currentPosition;

    if (typeof lastPosition === 'undefined') {
      return;
    }

    const positionDiff = {
      x: lastPosition.x - currentPosition.x,
      y: lastPosition.y - currentPosition.y,
    };

    element.style.removeProperty('transition');
    element.style.setProperty(
      'transform',
      `translate(${positionDiff.x}px, ${positionDiff.y}px)`,
    );
    shouldPlayRef.current = true;
  }, [dependency]);

  useEffect(() => {
    const element = elementRef.current;
    if (element == null) {
      throw new Error('Missing element ref!');
    }

    if (shouldPlayRef.current) {
      element.style.setProperty('transition', 'transform .5s linear');
      element.style.setProperty('transform', 'translate(0px, 0px)');
      shouldPlayRef.current = false;
    }
  });

  return elementRef;
}

export default useAnimatePosition;
