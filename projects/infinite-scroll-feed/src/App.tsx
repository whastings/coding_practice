import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './App.module.css';
import FeedItemCard from './FeedItemCard';
import useFeedData from './useFeedData';
import useScrollListener from './useScrollListener';

interface FeedItemInfo {
  height: number;
  position: number;
}

interface RenderedRange {
  startIndex: number;
  endIndex: number;
}

const NUM_CARDS_PER_PAGE = 20;
const NUM_OVERSCAN_ITEMS = 2;

function App() {
  const { feedData, fetchNextPage, isLoading } = useFeedData(
    NUM_CARDS_PER_PAGE,
  );
  const [renderedRange, setRenderedRange] = useState<RenderedRange>({
    startIndex: 0,
    endIndex: NUM_CARDS_PER_PAGE - 1,
  });
  const feedElementsRef = useRef<HTMLDivElement[]>([]);
  const [feedItemsInfo, setFeedItemsInfo] = useState<FeedItemInfo[]>([]);

  useEffect(() => {
    if (feedData.items.length === 0) {
      fetchNextPage();
    }
  }, [feedData, fetchNextPage]);

  useEffect(() => {
    setFeedItemsInfo((info) => {
      feedElementsRef.current.forEach((element, i) => {
        const feedIndex = i + renderedRange.startIndex;
        if (info[feedIndex] == null) {
          const height = element.clientHeight;
          const previousItemInfo = feedIndex > 0 ? info[feedIndex - 1] : null;
          const position =
            previousItemInfo != null
              ? previousItemInfo.position + previousItemInfo.height
              : 0;
          info[feedIndex] = {
            height,
            position,
          };
        }
      });

      // TODO: Only set if we actually had to create info for an item
      return info.slice();
    });
  }, [feedData.items.length, renderedRange.startIndex]);

  const updateRenderedItems = useCallback(() => {
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
    setRenderedRange((range) => {
      if (startIndex !== range.startIndex || endIndex !== range.endIndex) {
        return { startIndex, endIndex };
      }
      return range;
    });
  }, [feedItemsInfo]);

  useEffect(() => {
    if (feedItemsInfo.length === 0) {
      return;
    }
    updateRenderedItems();
  }, [feedItemsInfo, updateRenderedItems]);

  useScrollListener(() => {
    updateRenderedItems();
  });

  const addFeedElementsRef = (
    element: HTMLDivElement | null,
    index: number,
  ): void => {
    if (element != null) {
      feedElementsRef.current[index] = element;
    }
  };

  const getFeedCardContainerStyles = (index: number) => {
    const itemInfo = feedItemsInfo[index + renderedRange.startIndex];

    if (itemInfo != null) {
      return { top: itemInfo.position };
    }

    return undefined;
  };

  const feedContainerHeight = useMemo(() => {
    return feedItemsInfo.reduce((sum, { height }) => sum + height, 0);
  }, [feedItemsInfo]);

  const renderedItems =
    feedData.items.length > 0
      ? feedData.items.slice(
          renderedRange.startIndex,
          renderedRange.endIndex + 1,
        )
      : [];

  return (
    <div className={styles.app}>
      {renderedItems.length > 0 && (
        <div
          className={styles.feedContainer}
          style={{ height: feedContainerHeight }}
        >
          {renderedItems.map((item, i) => (
            <div
              className={styles.feedCardContainer}
              key={i}
              ref={(element) => addFeedElementsRef(element, i)}
              style={getFeedCardContainerStyles(i)}
            >
              <FeedItemCard item={item} />
            </div>
          ))}
        </div>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
