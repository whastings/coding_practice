import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

function useAnimatePosition<TElement extends HTMLElement>(
  dependency: unknown,
): MutableRefObject<TElement | null> {
  const elementRef = useRef<TElement>(null);
  const lastPositionRef = useRef<DOMRect | void>();
  const lastDepValueRef = useRef<unknown>(dependency);
  const shouldPlayRef = useRef(false);
  const isAnimatingRef = useRef(false);

  if (
    dependency !== lastDepValueRef.current &&
    isAnimatingRef.current &&
    elementRef.current != null
  ) {
    lastPositionRef.current = elementRef.current.getBoundingClientRect();
  }
  lastDepValueRef.current = dependency;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (element == null) {
      throw new Error('Missing element ref!');
    }
    element.style.removeProperty('transition');
    element.style.removeProperty('transform');

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
      element.style.setProperty('transition', 'transform 2s linear');
      element.style.setProperty('transform', 'translate(0px, 0px)');
      shouldPlayRef.current = false;
      isAnimatingRef.current = true;
      const animationEndCallback = () => {
        isAnimatingRef.current = false;
        element.removeEventListener('transitionend', animationEndCallback);
      };
      element.addEventListener('transitionend', animationEndCallback);
    }
  });

  return elementRef;
}

export default useAnimatePosition;
