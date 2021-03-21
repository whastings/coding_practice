import { FeedItemInfo, RenderedRange } from './types';

const NUM_OVERSCAN_ITEMS = 2;

export function addRenderedItemsInfo(
  feedItemsInfo: FeedItemInfo[],
  feedElements: HTMLDivElement[],
  renderedRange: RenderedRange,
): FeedItemInfo[] {
  const numItemsRendered =
    renderedRange.endIndex - renderedRange.startIndex + 1;
  for (let i = 0; i < numItemsRendered; i++) {
    const element = feedElements[i];
    if (element == null) {
      continue;
    }
    const feedIndex = i + renderedRange.startIndex;
    if (feedItemsInfo[feedIndex] == null) {
      const height = element.clientHeight;
      const previousItemInfo =
        feedIndex > 0 ? feedItemsInfo[feedIndex - 1] : null;
      const position =
        previousItemInfo != null
          ? previousItemInfo.position + previousItemInfo.height
          : 0;
      feedItemsInfo[feedIndex] = {
        height,
        position,
      };
    }
  }

  // TODO: Only set if we actually had to create info for an item
  return feedItemsInfo.slice();
}

export function getRenderedItemsRange(
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
