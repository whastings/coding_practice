import { Position, Size } from './DraggableListType';

interface Rect {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export const getDocumentRelativeRect = (viewportRect: DOMRect): DOMRect => {
  const { height, width, x, y } = viewportRect;
  return DOMRectReadOnly.fromRect({
    height,
    width,
    x: x + window.scrollX,
    y: y + window.scrollY,
  });
};

const doRectsIntersect = (rect1: Rect, rect2: Rect): boolean => {
  const intersectsVertically =
    (rect1.bottom > rect2.top && rect1.bottom < rect2.bottom) ||
    (rect1.top > rect2.top && rect1.top < rect2.bottom) ||
    (rect2.bottom > rect1.top && rect2.bottom < rect1.bottom) ||
    (rect2.top > rect1.top && rect2.top < rect1.bottom);

  if (!intersectsVertically) {
    return false;
  }

  const intersectsHorizontally =
    (rect1.left > rect2.left && rect1.left < rect2.right) ||
    (rect1.right > rect2.left && rect1.right < rect2.right) ||
    (rect2.left > rect1.left && rect2.left < rect1.right) ||
    (rect2.right > rect1.left && rect2.right < rect1.right);

  return intersectsHorizontally;
};

export const getNewPlaceholderIndex = (
  listElements: Array<HTMLDivElement | null>,
  listElementRects: Map<number, DOMRect>,
  movingItemPosition: Position,
  movingItemSize: Size,
  placeholderIndex: number,
): number | null => {
  const movingItemRect = {
    bottom: movingItemPosition.y + movingItemSize.height,
    left: movingItemPosition.x,
    right: movingItemPosition.x + movingItemSize.width,
    top: movingItemPosition.y,
  };

  for (let i = 0; i < listElements.length; i++) {
    const element = listElements[i];
    if (element == null) {
      continue;
    }

    const elementRect = listElementRects.get(i);
    if (elementRect == null || !doRectsIntersect(movingItemRect, elementRect)) {
      continue;
    }

    if (
      movingItemRect.top > elementRect.top &&
      movingItemRect.top < elementRect.bottom
    ) {
      const threshold = elementRect.bottom - elementRect.height * 0.7;
      if (movingItemRect.top < threshold) {
        return i === placeholderIndex ? i - 1 : i;
      }
    }

    if (
      movingItemRect.bottom > elementRect.top &&
      movingItemRect.bottom < elementRect.bottom
    ) {
      const threshold = elementRect.top + elementRect.height * 0.7;
      if (movingItemRect.bottom > threshold) {
        return i === placeholderIndex ? i + 1 : i;
      }
    }
  }

  return null;
};
