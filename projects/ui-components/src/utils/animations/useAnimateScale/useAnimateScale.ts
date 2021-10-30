import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

interface Result<
  TContainerElement extends HTMLElement,
  TContentElement extends HTMLElement,
  TExpandedElement extends HTMLElement
> {
  containerRef: MutableRefObject<TContainerElement | null>;
  contentRef: MutableRefObject<TContentElement | null>;
  expandedContentRef: MutableRefObject<TExpandedElement | null>;
  toggle: () => void;
}

interface ScaleKeyframes {
  containerKeyframes: Keyframe[];
  contentKeyframes: Keyframe[];
}

interface ScaleTransforms {
  containerTransform: { transform: string };
  contentTransform: { transform: string };
}

const DURATION = 2000;

function ease(increment: number): number {
  return increment * increment * increment;
}

function getScaleTransforms(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
  increment: number,
): ScaleTransforms {
  const collapsedXScale = collapsedRect.width / expandedRect.width;
  const collapsedYScale = collapsedRect.height / expandedRect.height;
  const xScale = collapsedXScale + (1 - collapsedXScale) * increment;
  const yScale = collapsedYScale + (1 - collapsedYScale) * increment;
  const xInvertScale = 1 / xScale;
  const yInvertScale = 1 / yScale;

  return {
    containerTransform: { transform: `scale(${xScale}, ${yScale})` },
    contentTransform: { transform: `scale(${xInvertScale}, ${yInvertScale})` },
  };
}

function createKeyframes(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): [ScaleKeyframes, ScaleKeyframes] {
  const scaleUpKeyframes: ScaleKeyframes = {
    containerKeyframes: [],
    contentKeyframes: [],
  };
  const scaleDownKeyframes: ScaleKeyframes = {
    containerKeyframes: [],
    contentKeyframes: [],
  };
  const numFrames = Math.round(60 * (DURATION / 1000));

  for (let i = 1; i <= numFrames; i++) {
    const scaleUpIncrement = ease(i / numFrames);
    const scaleDownIncrement = ease((numFrames + 1 - i) / numFrames);
    const scaleUpTransforms = getScaleTransforms(
      collapsedRect,
      expandedRect,
      scaleUpIncrement,
    );
    const scaleDownTransforms = getScaleTransforms(
      collapsedRect,
      expandedRect,
      scaleDownIncrement,
    );

    scaleUpKeyframes.containerKeyframes.push(
      scaleUpTransforms.containerTransform,
    );
    scaleUpKeyframes.contentKeyframes.push(scaleUpTransforms.contentTransform);

    scaleDownKeyframes.containerKeyframes.push(
      scaleDownTransforms.containerTransform,
    );
    scaleDownKeyframes.contentKeyframes.push(
      scaleDownTransforms.contentTransform,
    );
  }

  return [scaleUpKeyframes, scaleDownKeyframes];
}

function useAnimateScale<
  TContainerElement extends HTMLElement,
  TContentElement extends HTMLElement,
  TExpandedElement extends HTMLElement
>(): Result<TContainerElement, TContentElement, TExpandedElement> {
  const containerRef = useRef<TContainerElement>(null);
  const contentRef = useRef<TContentElement>(null);
  const expandedContentRef = useRef<TExpandedElement>(null);
  const collapsedRectRef = useRef<DOMRect | null>(null);
  const expandedRectRef = useRef<DOMRect | null>(null);
  const isExpandedRef = useRef(false);
  const scaleUpKeyframesRef = useRef<ScaleKeyframes | null>(null);
  const scaleDownKeyframesRef = useRef<ScaleKeyframes | null>(null);
  const containerAnimationRef = useRef<Animation | null>(null);
  const contentAnimationRef = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;
    const contentElement = contentRef.current;
    const expandedContentElement = expandedContentRef.current;

    if (
      containerElement == null ||
      contentElement == null ||
      expandedContentElement == null
    ) {
      throw new Error('Refs not set!');
    }

    const expandedRect = containerElement.getBoundingClientRect();
    expandedContentElement.style.setProperty('display', 'none');
    const collapsedRect = containerElement.getBoundingClientRect();
    expandedContentElement.style.removeProperty('display');
    expandedRectRef.current = expandedRect;
    collapsedRectRef.current = collapsedRect;
    const { containerTransform, contentTransform } = getScaleTransforms(
      collapsedRect,
      expandedRect,
      0,
    );

    containerElement.style.setProperty('will-change', 'transform');
    containerElement.style.setProperty('transform-origin', 'top left');
    containerElement.style.setProperty(
      'transform',
      containerTransform.transform,
    );

    contentElement.style.setProperty('will-change', 'transform');
    contentElement.style.setProperty('transform-origin', 'top left');
    contentElement.style.setProperty('transform', contentTransform.transform);
  }, []);

  const getKeyframes = useCallback(
    (collapsedRect: DOMRect, expandedRect: DOMRect) => {
      const cachedScaleUpKeyframes = scaleUpKeyframesRef.current;
      const cachedScaleDownKeyframes = scaleDownKeyframesRef.current;

      if (cachedScaleUpKeyframes != null && cachedScaleDownKeyframes != null) {
        return {
          scaleDownKeyframes: cachedScaleDownKeyframes,
          scaleUpKeyframes: cachedScaleUpKeyframes,
        };
      }

      const [scaleUpKeyframes, scaleDownKeyframes] = createKeyframes(
        collapsedRect,
        expandedRect,
      );
      scaleUpKeyframesRef.current = scaleUpKeyframes;
      scaleDownKeyframesRef.current = scaleDownKeyframes;

      return {
        scaleDownKeyframes,
        scaleUpKeyframes,
      };
    },
    [],
  );

  const storeAnimation = useCallback(
    (animation: Animation, ref: MutableRefObject<Animation | null>) => {
      ref.current = animation;
      animation.onfinish = () => {
        ref.current = null;
      };
    },
    [],
  );

  const toggle = useCallback(() => {
    const collapsedRect = collapsedRectRef.current;
    const expandedRect = expandedRectRef.current;
    const containerElement = containerRef.current;
    const contentElement = contentRef.current;

    if (
      containerElement == null ||
      contentElement == null ||
      collapsedRect == null ||
      expandedRect == null
    ) {
      return;
    }

    const { scaleDownKeyframes, scaleUpKeyframes } = getKeyframes(
      collapsedRect,
      expandedRect,
    );

    let keyframes: ScaleKeyframes;
    let scaleTransforms: ScaleTransforms;

    if (isExpandedRef.current) {
      scaleTransforms = getScaleTransforms(collapsedRect, expandedRect, 0);
      keyframes = scaleDownKeyframes;
    } else {
      scaleTransforms = {
        containerTransform: { transform: 'scale(1, 1)' },
        contentTransform: { transform: 'scale(1, 1)' },
      };
      keyframes = scaleUpKeyframes;
    }

    containerElement.style.setProperty(
      'transform',
      scaleTransforms.containerTransform.transform,
    );
    contentElement.style.setProperty(
      'transform',
      scaleTransforms.contentTransform.transform,
    );

    const existingContainerAnimation = containerAnimationRef.current;
    const existingContentAnimation = contentAnimationRef.current;
    if (
      existingContainerAnimation != null &&
      existingContentAnimation != null
    ) {
      existingContainerAnimation.reverse();
      existingContentAnimation.reverse();
    } else {
      const { containerKeyframes, contentKeyframes } = keyframes;
      const containerAnimation = containerElement.animate(
        containerKeyframes,
        DURATION,
      );
      const contentAnimation = contentElement.animate(
        contentKeyframes,
        DURATION,
      );
      storeAnimation(containerAnimation, containerAnimationRef);
      storeAnimation(contentAnimation, contentAnimationRef);
    }

    isExpandedRef.current = !isExpandedRef.current;
  }, [getKeyframes, storeAnimation]);

  return useMemo(
    () => ({
      containerRef,
      contentRef,
      expandedContentRef,
      toggle,
    }),
    [toggle],
  );
}

export default useAnimateScale;
