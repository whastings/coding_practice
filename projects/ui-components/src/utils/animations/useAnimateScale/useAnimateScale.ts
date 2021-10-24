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

interface Animation {
  containerKeyframes: Keyframe[];
  contentKeyframes: Keyframe[];
}

interface ScaleTransforms {
  containerTransform: { transform: string };
  contentTransform: { transform: string };
}

const DURATION = 1000;

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

function createScaleUpAnimation(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): Animation {
  const containerKeyframes = [];
  const contentKeyframes = [];

  for (let i = 0.01; i <= 1; i += 0.01) {
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
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): Animation {
  const containerKeyframes = [];
  const contentKeyframes = [];

  for (let i = 1; i >= 0; i -= 0.01) {
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
  const scaleUpAnimationRef = useRef<Animation | null>(null);
  const scaleDownAnimationRef = useRef<Animation | null>(null);

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
    (collapsedRect: DOMRect, expandedRect: DOMRect) => {
      const cachedScaleUpAnimation = scaleUpAnimationRef.current;
      const cachedScaleDownAnimation = scaleDownAnimationRef.current;

      if (cachedScaleUpAnimation != null && cachedScaleDownAnimation != null) {
        return {
          scaleDownAnimation: cachedScaleDownAnimation,
          scaleUpAnimation: cachedScaleUpAnimation,
        };
      }

      scaleUpAnimationRef.current = createScaleUpAnimation(
        collapsedRect,
        expandedRect,
      );
      scaleDownAnimationRef.current = createScaleDownAnimation(
        collapsedRect,
        expandedRect,
      );
      return {
        scaleDownAnimation: scaleDownAnimationRef.current,
        scaleUpAnimation: scaleUpAnimationRef.current,
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

    const { scaleDownAnimation, scaleUpAnimation } = getAnimations(
      collapsedRect,
      expandedRect,
    );

    let animation: Animation;
    let scaleTransforms: ScaleTransforms;

    if (isExpandedRef.current) {
      scaleTransforms = getScaleTransforms(collapsedRect, expandedRect, 0);
      animation = scaleDownAnimation;
    } else {
      scaleTransforms = {
        containerTransform: { transform: 'scale(1, 1)' },
        contentTransform: { transform: 'scale(1, 1)' },
      };
      animation = scaleUpAnimation;
    }

    containerElement.style.setProperty(
      'transform',
      scaleTransforms.containerTransform.transform,
    );
    contentElement.style.setProperty(
      'transform',
      scaleTransforms.contentTransform.transform,
    );
    const { containerKeyframes, contentKeyframes } = animation;
    containerElement.animate(containerKeyframes, DURATION);
    contentElement.animate(contentKeyframes, DURATION);
    isExpandedRef.current = !isExpandedRef.current;
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
