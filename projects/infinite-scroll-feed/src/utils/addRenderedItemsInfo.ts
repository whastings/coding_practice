import { FeedItemInfo, RenderedRange } from '../types';

export default function addRenderedItemsInfo(
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
