import { FeedItemInfo, RenderedRange } from '../types';

const NUM_OVERSCAN_ITEMS = 2;

function isInViewport(
  feedItemInfo: FeedItemInfo,
  viewportTopPosition: number,
  viewportBottomPosition: number,
): boolean {
  const itemStartPosition = feedItemInfo.position;
  const itemEndPosition = feedItemInfo.position + feedItemInfo.height;

  return (
    (itemStartPosition >= viewportTopPosition &&
      itemStartPosition < viewportBottomPosition) ||
    (itemEndPosition > viewportTopPosition &&
      itemEndPosition <= viewportBottomPosition) ||
    (viewportTopPosition >= itemStartPosition &&
      viewportBottomPosition <= itemEndPosition)
  );
}

function findItemInViewport(
  feedItemsInfo: FeedItemInfo[],
  viewportTopPosition: number,
  viewportBottomPosition: number,
  searchStart = 0,
  searchEnd = feedItemsInfo.length - 1,
): number {
  const middleIndex = Math.floor((searchEnd + searchStart) / 2);
  const middleItem = feedItemsInfo[middleIndex];

  if (isInViewport(middleItem, viewportTopPosition, viewportBottomPosition)) {
    return middleIndex;
  }

  if (viewportBottomPosition <= middleItem.position) {
    return findItemInViewport(
      feedItemsInfo,
      viewportTopPosition,
      viewportBottomPosition,
      searchStart,
      middleIndex - 1,
    );
  }

  return findItemInViewport(
    feedItemsInfo,
    viewportTopPosition,
    viewportBottomPosition,
    middleIndex + 1,
    searchEnd,
  );
}

export default function getRenderedItemsRange(
  feedItemsInfo: FeedItemInfo[],
): RenderedRange {
  const viewportTopPosition = window.scrollY;
  const viewportBottomPosition = window.scrollY + window.innerHeight;
  const itemInViewportIndex = findItemInViewport(
    feedItemsInfo,
    viewportTopPosition,
    viewportBottomPosition,
  );

  let startIndex = itemInViewportIndex;
  while (
    startIndex > 0 &&
    isInViewport(
      feedItemsInfo[startIndex - 1],
      viewportTopPosition,
      viewportBottomPosition,
    )
  ) {
    startIndex -= 1;
  }

  let endIndex = itemInViewportIndex;
  while (
    endIndex < feedItemsInfo.length - 1 &&
    isInViewport(
      feedItemsInfo[endIndex + 1],
      viewportTopPosition,
      viewportBottomPosition,
    )
  ) {
    endIndex += 1;
  }

  return {
    startIndex: Math.max(startIndex - NUM_OVERSCAN_ITEMS, 0),
    endIndex: Math.min(feedItemsInfo.length - 1, endIndex + NUM_OVERSCAN_ITEMS),
  };
}
