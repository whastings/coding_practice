import { FeedItemInfo, RenderedRange } from '../types';

const NUM_OVERSCAN_ITEMS = 2;

export default function getRenderedItemsRange(
  feedItemsInfo: FeedItemInfo[],
): RenderedRange {
  const viewportTopPosition = window.scrollY;
  const viewportBottomPosition = window.scrollY + window.innerHeight;
  const feedItemsInViewport: number[] = [];

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
