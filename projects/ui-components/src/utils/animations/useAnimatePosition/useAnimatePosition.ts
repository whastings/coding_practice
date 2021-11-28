import { MutableRefObject, useLayoutEffect, useRef } from 'react';

import { KeyframesGenerator } from '../AnimationTypes';

interface Options {
  keyframesGenerator: KeyframesGenerator;
}

function useAnimatePosition<TElement extends HTMLElement>(
  dependency: unknown,
  { keyframesGenerator }: Options,
): MutableRefObject<TElement | null> {
  const elementRef = useRef<TElement>(null);
  const lastPositionRef = useRef<DOMRect | void>();
  const lastDepValueRef = useRef<unknown>(dependency);
  const animationRef = useRef<Animation | null>(null);

  // TODO: Handle interruption in a less hacky/flaky way.
  if (
    dependency !== lastDepValueRef.current &&
    animationRef.current != null &&
    elementRef.current != null
  ) {
    lastPositionRef.current = elementRef.current.getBoundingClientRect();
    animationRef.current.cancel();
  }
  lastDepValueRef.current = dependency;

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

    const { keyframes, options } = keyframesGenerator(
      lastPosition,
      currentPosition,
    );
    const animation = element.animate(keyframes, {
      duration: options.duration,
      easing: 'linear',
    });
    animationRef.current = animation;
    const animationEndCallback = () => {
      animationRef.current = null;
    };
    animation.addEventListener('finish', animationEndCallback);
    animation.addEventListener('cancel', animationEndCallback);
  }, [dependency, keyframesGenerator]);

  return elementRef;
}

export default useAnimatePosition;
