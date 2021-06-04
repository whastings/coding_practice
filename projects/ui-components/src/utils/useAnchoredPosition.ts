import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import getDocumentRelativeRect from './getDocumentRelativeRect';
import useThrottled from './useThrottled';

export enum AnchorPoint {
  BOTTOM,
  END,
  START,
  TOP,
}

export enum AnchorAlignment {
  CENTER,
  END,
  START,
}

interface Params {
  anchorPoint: AnchorPoint;
  anchorAlignment: AnchorAlignment;
  isRendered: boolean;
  offset?: number;
}

interface Position {
  left: number;
  top: number;
}

interface Result<AnchorElement, PositionedElement> {
  anchorPoint: AnchorPoint;
  anchorRef: React.MutableRefObject<AnchorElement | null>;
  positionedRef: React.MutableRefObject<PositionedElement | null>;
  position: Position | null;
}

const ANCHOR_POINT_OPPOSITES: Record<AnchorPoint, AnchorPoint> = {
  [AnchorPoint.BOTTOM]: AnchorPoint.TOP,
  [AnchorPoint.END]: AnchorPoint.START,
  [AnchorPoint.START]: AnchorPoint.END,
  [AnchorPoint.TOP]: AnchorPoint.BOTTOM,
};

function getAlignedPosition(
  anchorPositionStart: number,
  anchorPositionEnd: number,
  anchorDimension: number,
  positionedDimension: number,
  anchorAlignment: AnchorAlignment,
): number {
  switch (anchorAlignment) {
    case AnchorAlignment.CENTER:
      return (
        anchorPositionStart + anchorDimension / 2 - positionedDimension / 2
      );
    case AnchorAlignment.END:
      return anchorPositionEnd;
    case AnchorAlignment.START:
      return anchorPositionStart;
  }
}

function getPositionForAnchorPoint(
  anchorRect: DOMRect,
  positionedRect: DOMRect,
  anchorPoint: AnchorPoint,
  anchorAlignment: AnchorAlignment,
  offset: number,
): Position {
  switch (anchorPoint) {
    case AnchorPoint.TOP:
      return {
        left: getAlignedPosition(
          anchorRect.left,
          anchorRect.right,
          anchorRect.width,
          positionedRect.width,
          anchorAlignment,
        ),
        top: anchorRect.top - offset - positionedRect.height,
      };
    case AnchorPoint.BOTTOM:
      return {
        left: getAlignedPosition(
          anchorRect.left,
          anchorRect.right,
          anchorRect.width,
          positionedRect.width,
          anchorAlignment,
        ),
        top: anchorRect.bottom + offset,
      };
    case AnchorPoint.START:
      return {
        left: anchorRect.left - offset - positionedRect.width,
        top: getAlignedPosition(
          anchorRect.top,
          anchorRect.bottom,
          anchorRect.height,
          positionedRect.height,
          anchorAlignment,
        ),
      };
    case AnchorPoint.END:
      return {
        left: anchorRect.right + offset,
        top: getAlignedPosition(
          anchorRect.top,
          anchorRect.bottom,
          anchorRect.height,
          positionedRect.height,
          anchorAlignment,
        ),
      };
  }
}

function isWithinViewport(
  position: Position,
  width: number,
  height: number,
): boolean {
  const left = position.left - window.scrollX;
  const top = position.top - window.scrollY;
  const right = left + width;
  const bottom = top + height;

  return (
    left > 0 &&
    left < window.innerWidth &&
    right > 0 &&
    right < window.innerWidth &&
    top > 0 &&
    top < window.innerHeight &&
    bottom > 0 &&
    bottom < window.innerHeight
  );
}

function getPositionAndAnchorPoint(
  anchorEl: HTMLElement,
  positionedEl: HTMLElement,
  anchorPoint: AnchorPoint,
  anchorAlignment: AnchorAlignment,
  offset: number,
): { position: Position; anchorPoint: AnchorPoint } {
  const anchorRect = getDocumentRelativeRect(anchorEl.getBoundingClientRect());
  const positionedRect = getDocumentRelativeRect(
    positionedEl.getBoundingClientRect(),
  );
  const position = getPositionForAnchorPoint(
    anchorRect,
    positionedRect,
    anchorPoint,
    anchorAlignment,
    offset,
  );

  if (
    !isWithinViewport(position, positionedRect.width, positionedRect.height)
  ) {
    const oppositeAnchorPoint = ANCHOR_POINT_OPPOSITES[anchorPoint];
    const flippedPosition = getPositionForAnchorPoint(
      anchorRect,
      positionedRect,
      oppositeAnchorPoint,
      anchorAlignment,
      offset,
    );
    return { anchorPoint: oppositeAnchorPoint, position: flippedPosition };
  }

  return { anchorPoint, position };
}

function useAnchoredPosition<
  AnchorElement extends HTMLElement,
  PositionedElement extends HTMLElement
>({
  anchorAlignment,
  anchorPoint,
  isRendered,
  offset = 0,
}: Params): Result<AnchorElement, PositionedElement> {
  const anchorRef = useRef<AnchorElement>(null);
  const positionedRef = useRef<PositionedElement>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [renderedAnchorPoint, setRenderedAnchorPoint] = useState<AnchorPoint>(
    anchorPoint,
  );

  const reposition = useCallback(() => {
    if (anchorRef.current == null || positionedRef.current == null) {
      return;
    }

    const {
      anchorPoint: actualAnchorPoint,
      position,
    } = getPositionAndAnchorPoint(
      anchorRef.current,
      positionedRef.current,
      anchorPoint,
      anchorAlignment,
      offset,
    );
    setPosition(position);
    setRenderedAnchorPoint(actualAnchorPoint);
  }, [anchorAlignment, anchorPoint, offset]);

  useLayoutEffect(() => {
    if (!isRendered) {
      return;
    }

    reposition();
  }, [isRendered, reposition]);

  const throttledReposition = useThrottled(reposition, 100);
  useEffect(() => {
    if (isRendered) {
      window.addEventListener('scroll', throttledReposition, { passive: true });
      window.addEventListener('resize', throttledReposition, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', throttledReposition);
      window.removeEventListener('resize', throttledReposition);
    };
  }, [isRendered, throttledReposition]);

  return {
    anchorPoint: renderedAnchorPoint,
    anchorRef,
    position,
    positionedRef,
  };
}

export default useAnchoredPosition;
