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

interface ScaleAnimation {
  containerKeyframes: Keyframe[];
  contentKeyframes: Keyframe[];
}

interface AnimationCache {
  collapsedRect: DOMRect;
  expandedRect: DOMRect;
  scaleDownAnimation: ScaleAnimation;
  scaleUpAnimation: ScaleAnimation;
}

function getScaleTransforms(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
  increment: number,
) {
  const xDiff = expandedRect.width - collapsedRect.width;
  const yDiff = expandedRect.height - collapsedRect.height;
  const xAmount = xDiff * increment;
  const yAmount = yDiff * increment;
  const xSize = xAmount + collapsedRect.width;
  const ySize = yAmount + collapsedRect.height;
  const xScale = xSize / expandedRect.width;
  const yScale = ySize / expandedRect.height;
  const xInvertScale = 1 / xScale;
  const yInvertScale = 1 / yScale;
  return {
    containerTransform: { transform: `scale(${xScale}, ${yScale})` },
    contentTransform: { transform: `scale(${xInvertScale}, ${yInvertScale})` },
  };
}

function createScaleUpAnimation(
  startRect: DOMRect,
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): ScaleAnimation {
  const containerKeyframes = [];
  const contentKeyframes = [];
  const startingPoint =
    ((startRect.width - collapsedRect.width) *
      (startRect.height - collapsedRect.height)) /
    ((expandedRect.width - collapsedRect.width) *
      (expandedRect.height - collapsedRect.height));

  for (let i = startingPoint; i <= 1; i += 0.01) {
    const { containerTransform, contentTransform } = getScaleTransforms(
      collapsedRect,
      expandedRect,
      i,
    );
    containerKeyframes.push(containerTransform);
    contentKeyframes.push(contentTransform);
  }

  return { containerKeyframes, contentKeyframes };
}

function createScaleDownAnimation(
  startRect: DOMRect,
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): ScaleAnimation {
  const containerKeyframes = [];
  const contentKeyframes = [];
  const startingPoint =
    ((startRect.width - collapsedRect.width) *
      (startRect.height - collapsedRect.height)) /
    ((expandedRect.width - collapsedRect.width) *
      (expandedRect.height - collapsedRect.height));

  for (let i = startingPoint; i >= 0; i -= 0.01) {
    const { containerTransform, contentTransform } = getScaleTransforms(
      collapsedRect,
      expandedRect,
      i,
    );
    containerKeyframes.push(containerTransform);
    contentKeyframes.push(contentTransform);
  }

  return { containerKeyframes, contentKeyframes };
}

function areRectsEqual(rect1: DOMRect, rect2: DOMRect): boolean {
  return rect1.height === rect2.height && rect1.width === rect2.width;
}

function useAnimateScale<
  TContainerElement extends HTMLElement,
  TContentElement extends HTMLElement,
  TExpandedElement extends HTMLElement
>(): Result<TContainerElement, TContentElement, TExpandedElement> {
  const containerRef = useRef<TContainerElement>(null);
  const contentRef = useRef<TContentElement>(null);
  const expandedContentRef = useRef<TExpandedElement>(null);
  const collapsedRectRef = useRef<DOMRect>(null);
  const expandedRectRef = useRef<DOMRect>(null);
  const isExpandedRef = useRef(false);
  const animationCacheRef = useRef<AnimationCache>(null);
  const currentContainerAnimationRef = useRef<Animation>(null);
  const currentContentAnimationRef = useRef<Animation>(null);

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

  const getAnimations = useCallback(
    (startRect: DOMRect, collapsedRect: DOMRect, expandedRect: DOMRect) => {
      let animationCache = animationCacheRef.current;

      if (
        !areRectsEqual(startRect, collapsedRect) &&
        !areRectsEqual(startRect, expandedRect)
      ) {
        return {
          scaleUpAnimation: createScaleUpAnimation(
            startRect,
            collapsedRect,
            expandedRect,
          ),
          scaleDownAnimation: createScaleDownAnimation(
            startRect,
            collapsedRect,
            expandedRect,
          ),
        };
      }

      if (
        animationCache == null ||
        !areRectsEqual(collapsedRect, animationCache.collapsedRect) ||
        !areRectsEqual(expandedRect, animationCache.expandedRect)
      ) {
        animationCache = {
          collapsedRect,
          expandedRect,
          scaleUpAnimation: createScaleUpAnimation(
            startRect,
            collapsedRect,
            expandedRect,
          ),
          scaleDownAnimation: createScaleDownAnimation(
            startRect,
            collapsedRect,
            expandedRect,
          ),
        };
      }

      return {
        scaleDownAnimation: animationCache.scaleDownAnimation,
        scaleUpAnimation: animationCache.scaleUpAnimation,
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

    let startRect = isExpandedRef.current ? expandedRect : collapsedRect;
    if (
      currentContainerAnimationRef.current != null ||
      currentContentAnimationRef.current != null
    ) {
      startRect = containerElement.getBoundingClientRect();
      currentContainerAnimationRef.current?.cancel();
      currentContentAnimationRef.current?.cancel();
    }

    const { scaleDownAnimation, scaleUpAnimation } = getAnimations(
      startRect,
      collapsedRect,
      expandedRect,
    );

    let containerAnimation: Animation;
    let contentAnimation: Animation;
    if (isExpandedRef.current) {
      const { containerTransform, contentTransform } = getScaleTransforms(
        collapsedRect,
        expandedRect,
        0,
      );
      const { containerKeyframes, contentKeyframes } = scaleDownAnimation;
      containerElement.style.setProperty(
        'transform',
        containerTransform.transform,
      );
      contentElement.style.setProperty('transform', contentTransform.transform);
      containerAnimation = containerElement.animate(containerKeyframes, 1000);
      contentAnimation = contentElement.animate(contentKeyframes, 1000);
    } else {
      const { containerKeyframes, contentKeyframes } = scaleUpAnimation;
      containerElement.style.setProperty('transform', 'scale(1, 1)');
      contentElement.style.setProperty('transform', 'scale(1, 1)');
      containerAnimation = containerElement.animate(containerKeyframes, 1000);
      contentAnimation = contentElement.animate(contentKeyframes, 1000);
    }

    isExpandedRef.current = !isExpandedRef.current;
    currentContainerAnimationRef.current = containerAnimation;
    containerAnimation.onfinish = () => {
      currentContainerAnimationRef.current = null;
    };
    currentContentAnimationRef.current = contentAnimation;
    contentAnimation.onfinish = () => {
      currentContentAnimationRef.current = null;
    };
  }, [getAnimations]);

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
