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

function createScaleUpAnimation(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): Animation {
  const xDiff = expandedRect.width - collapsedRect.width;
  const yDiff = expandedRect.height - collapsedRect.height;
  const containerKeyframes = [];
  const contentKeyframes = [];

  for (let i = 0.01; i <= 1; i += 0.01) {
    const xAmount = xDiff * i;
    const yAmount = yDiff * i;
    const xSize = xAmount + collapsedRect.width;
    const ySize = yAmount + collapsedRect.height;
    const xScale = xSize / expandedRect.width;
    const yScale = ySize / expandedRect.height;
    containerKeyframes.push({ transform: `scale(${xScale}, ${yScale})` });
    contentKeyframes.push({ transform: `scale(${1 / xScale}, ${1 / yScale})` });
  }

  return { containerKeyframes, contentKeyframes };
}

function createScaleDownAnimation(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): Animation {
  const xDiff = expandedRect.width - collapsedRect.width;
  const yDiff = expandedRect.height - collapsedRect.height;
  const containerKeyframes = [];
  const contentKeyframes = [];

  for (let i = 1; i >= 0; i -= 0.01) {
    const xAmount = xDiff * i;
    const yAmount = yDiff * i;
    const xSize = xAmount + collapsedRect.width;
    const ySize = yAmount + collapsedRect.height;
    const xScale = xSize / expandedRect.width;
    const yScale = ySize / expandedRect.height;
    containerKeyframes.push({ transform: `scale(${xScale}, ${yScale})` });
    contentKeyframes.push({ transform: `scale(${1 / xScale}, ${1 / yScale})` });
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
  const collapsedRectRef = useRef<DOMRect>(null);
  const expandedRectRef = useRef<DOMRect>(null);
  const isExpandedRef = useRef(false);

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

    const xScaleContainer = collapsedRect.width / expandedRect.width;
    const yScaleContainer = collapsedRect.height / expandedRect.height;
    containerElement.style.setProperty('will-change', 'transform');
    containerElement.style.setProperty('transform-origin', 'top left');
    containerElement.style.setProperty(
      'transform',
      `scale(${xScaleContainer}, ${yScaleContainer})`,
    );

    const xScaleContent = 1 / xScaleContainer;
    const yScaleContent = 1 / yScaleContainer;
    contentElement.style.setProperty('will-change', 'transform');
    contentElement.style.setProperty('transform-origin', 'top left');
    contentElement.style.setProperty(
      'transform',
      `scale(${xScaleContent}, ${yScaleContent})`,
    );
  }, []);

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

    if (isExpandedRef.current) {
      const { containerKeyframes, contentKeyframes } = createScaleDownAnimation(
        collapsedRect,
        expandedRect,
      );
      const xScaleContainer = collapsedRect.width / expandedRect.width;
      const yScaleContainer = collapsedRect.height / expandedRect.height;
      const xScaleContent = 1 / xScaleContainer;
      const yScaleContent = 1 / yScaleContainer;
      containerElement.style.setProperty(
        'transform',
        `scale(${xScaleContainer}, ${yScaleContainer})`,
      );
      containerElement.animate(containerKeyframes, 1000);
      contentElement.style.setProperty(
        'transform',
        `scale(${xScaleContent}, ${yScaleContent})`,
      );
      contentElement.animate(contentKeyframes, 1000);
    } else {
      const { containerKeyframes, contentKeyframes } = createScaleUpAnimation(
        collapsedRect,
        expandedRect,
      );
      containerElement.style.setProperty('transform', 'scale(1, 1)');
      containerElement.animate(containerKeyframes, 1000);
      contentElement.style.setProperty('transform', 'scale(1, 1)');
      contentElement.animate(contentKeyframes, 1000);
    }
    isExpandedRef.current = !isExpandedRef.current;
  }, []);

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
