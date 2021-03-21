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
  const feedItemsInViewport: number[] = [];

  const index = findItemInViewport(
    feedItemsInfo,
    viewportTopPosition,
    viewportBottomPosition,
  );
  console.log('ITEM ', index, feedItemsInfo[index]);

  for (let i = 0; i < feedItemsInfo.length; i++) {
    const itemInfo = feedItemsInfo[i];
    const itemStartPosition = itemInfo.position;
    const itemEndPosition = itemInfo.position + itemInfo.height;

    if (itemStartPosition > viewportBottomPosition) {
      break;
    }

    if (
      (itemStartPosition >= viewportTopPosition &&
        itemStartPosition < viewportBottomPosition) ||
      (itemEndPosition > viewportTopPosition &&
        itemEndPosition <= viewportBottomPosition)
    ) {
      feedItemsInViewport.push(i);
    }
  }

  const startIndex = Math.max(feedItemsInViewport[0] - NUM_OVERSCAN_ITEMS, 0);
  const endIndex = Math.min(
    feedItemsInfo.length - 1,
    feedItemsInViewport[feedItemsInViewport.length - 1] + NUM_OVERSCAN_ITEMS,
  );
  return { startIndex, endIndex };
}
