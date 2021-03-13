import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './App.module.css';
import FeedItemCard from './FeedItemCard';
import useFeedData from './useFeedData';

interface FeedItemInfo {
  height: number;
  position: number;
}

interface RenderedRange {
  startIndex: number;
  endIndex: number;
}

const NUM_CARDS_PER_PAGE = 20;

function App() {
  const { feedData, fetchNextPage, isLoading } = useFeedData(
    NUM_CARDS_PER_PAGE,
  );
  const [renderedRange] = useState<RenderedRange>({
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
