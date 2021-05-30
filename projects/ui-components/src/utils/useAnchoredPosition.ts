import { useLayoutEffect, useRef, useState } from 'react';

import getDocumentRelativeRect from './getDocumentRelativeRect';

export enum AnchorPoint {
  BOTTOM,
  END,
  START,
  TOP,
}

interface Params {
  anchorPoint: AnchorPoint;
  isRendered: boolean;
  offset?: number;
}

interface Position {
  left: number;
  top: number;
}

interface Result<AnchorElement, PositionedElement> {
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

function getPositionForAnchorPoint(
  anchorRect: DOMRect,
  positionedRect: DOMRect,
  anchorPoint: AnchorPoint,
  offset: number,
): Position {
  switch (anchorPoint) {
    case AnchorPoint.TOP:
      return {
        left: anchorRect.left,
        top: anchorRect.top - offset - positionedRect.height,
      };
    case AnchorPoint.BOTTOM:
      return {
        left: anchorRect.left,
        top: anchorRect.bottom + offset,
      };
    default:
      throw new Error('Not supported yet');
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

function getPosition(
  anchorEl: HTMLElement,
  positionedEl: HTMLElement,
  anchorPoint: AnchorPoint,
  offset: number,
): Position {
  const anchorRect = getDocumentRelativeRect(anchorEl.getBoundingClientRect());
  const positionedRect = getDocumentRelativeRect(
    positionedEl.getBoundingClientRect(),
  );
  const position = getPositionForAnchorPoint(
    anchorRect,
    positionedRect,
    anchorPoint,
    offset,
  );

  if (
    !isWithinViewport(position, positionedRect.width, positionedRect.height)
  ) {
    return getPositionForAnchorPoint(
      anchorRect,
      positionedRect,
      ANCHOR_POINT_OPPOSITES[anchorPoint],
      offset,
    );
  }

  return position;
}

function useAnchoredPosition<
  AnchorElement extends HTMLElement,
  PositionedElement extends HTMLElement
>({
  anchorPoint,
  isRendered,
  offset = 0,
}: Params): Result<AnchorElement, PositionedElement> {
  const anchorRef = useRef<AnchorElement>(null);
  const positionedRef = useRef<PositionedElement>(null);
  const [position, setPosition] = useState<Position | null>(null);

  useLayoutEffect(() => {
    if (!isRendered) {
      return;
    }

    if (anchorRef.current == null) {
      throw new Error('Anchor ref is not set');
    }

    if (positionedRef.current == null) {
      throw new Error('Positioned ref is not set');
    }

    setPosition(
      getPosition(
        anchorRef.current,
        positionedRef.current,
        anchorPoint,
        offset,
      ),
    );
  }, [anchorPoint, isRendered, offset]);

  return { anchorRef, position, positionedRef };
}

export default useAnchoredPosition;
