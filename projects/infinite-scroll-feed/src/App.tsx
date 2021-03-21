import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  addRenderedItemsInfo,
  getRenderedItemsRange,
} from './FeedRenderingUtils';
import styles from './App.module.css';
import FeedItemCard from './FeedItemCard';
import { FeedItemInfo, RenderedRange } from './types';
import FeedLoadingIndicator from './FeedLoadingIndicator';
import useFeedData from './useFeedData';
import useScrollListener from './useScrollListener';

const LOADING_INDICATOR_HEIGHT = 30;
const NUM_CARDS_PER_PAGE = 20;

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

  const loadMoreItemsIfNeeded = () => {
    const viewportBottomPosition = window.scrollY + window.innerHeight;
    const secondToLastItemInfo = feedItemsInfo[feedItemsInfo.length - 2];
    if (viewportBottomPosition > secondToLastItemInfo.position && !isLoading) {
      fetchNextPage();
    }
  };

  const updateRenderedItems = useCallback(() => {
    setRenderedRange((range) => {
      const newRange = getRenderedItemsRange(feedItemsInfo);
      if (
        newRange.startIndex !== range.startIndex ||
        newRange.endIndex !== range.endIndex
      ) {
        return newRange;
      }
      return range;
    });
  }, [feedItemsInfo]);

  useEffect(() => {
    if (feedData.items.length === 0) {
      // Kick off initial API request.
      fetchNextPage();
    } else {
      // We just loaded more items from the API, so temporarily
      // render all the way to the last item so we can measure
      // the new items' heights.
      setRenderedRange((range) => ({
        ...range,
        endIndex: feedData.items.length - 1,
      }));
    }
  }, [feedData.items.length, fetchNextPage]);

  useEffect(() => {
    setFeedItemsInfo((info) =>
      // Measure any items rendered for the first time.
      addRenderedItemsInfo(info, feedElementsRef.current, renderedRange),
    );
  }, [renderedRange]);

  useEffect(() => {
    if (feedItemsInfo.length === 0) {
      return;
    }
    updateRenderedItems();
  }, [feedItemsInfo, updateRenderedItems]);

  useScrollListener(() => {
    updateRenderedItems();
    loadMoreItemsIfNeeded();
  });

  const feedItemsHeight = useMemo(() => {
    return feedItemsInfo.reduce((sum, { height }) => sum + height, 0);
  }, [feedItemsInfo]);
  const feedContainerHeight =
    feedItemsHeight + (isLoading ? LOADING_INDICATOR_HEIGHT : 0);
  const renderedItems =
    feedData.items.length > 0
      ? feedData.items.slice(
          renderedRange.startIndex,
          renderedRange.endIndex + 1,
        )
      : [];

  return (
    <div className={styles.app}>
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
        {isLoading && (
          <FeedLoadingIndicator
            height={LOADING_INDICATOR_HEIGHT}
            lastItemInfo={feedItemsInfo[renderedRange.endIndex]}
          />
        )}
      </div>
    </div>
  );
}

export default App;
