import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './App.module.css';
import FeedItemCard from './FeedItemCard';
import useFeedData from './useFeedData';
import useIntersectionObserver from './useIntersectionObserver';

interface RenderedRange {
  startIndex: number;
  endIndex: number;
}

const CARD_BOTTOM_MARGIN = 20;
const NUM_CARDS_RENDERED = 5;

const sumCardHeights = (heights: number[]) => {
  const heightsSum = heights.reduce((sum, num) => sum + num, 0);
  return heightsSum + heights.length * CARD_BOTTOM_MARGIN;
};

const getScrollPreservationValues = (
  cardHeights: number[],
  renderedRange: RenderedRange,
) => {
  const beforeCardHeights = cardHeights.slice(0, renderedRange.startIndex);
  const afterCardHeights = cardHeights.slice(renderedRange.endIndex + 1);

  return {
    before: sumCardHeights(beforeCardHeights),
    after: sumCardHeights(afterCardHeights),
  };
};

const useFeedCardObserver = (
  callback: (wasIntersecting: boolean, isIntersecting: boolean) => void,
) => {
  const wasIntersectingRef = useRef(false);

  const observerRef = useIntersectionObserver((entries) => {
    const [entry] = entries;
    callback(wasIntersectingRef.current, entry.isIntersecting);
    wasIntersectingRef.current = entry.isIntersecting;
  });

  return observerRef;
};

function App() {
  const { feedData, fetchNextPage, isLoading } = useFeedData();
  const wasLoadingRef = useRef(isLoading);
  const [renderedRange, setRenderedRange] = useState<RenderedRange>({
    startIndex: 0,
    endIndex: NUM_CARDS_RENDERED - 1,
  });
  const feedCardDimensionsRef = useRef<number[]>([]);
  const cardKeysRef = useRef(
    new Array(NUM_CARDS_RENDERED).fill(0).map((_, i) => i),
  );
  const endCardIntersectingRef = useRef(false);

  const setCardDimension = useCallback(
    (rect: DOMRect, feedIndex: number): void => {
      const dimensions = feedCardDimensionsRef.current;
      dimensions[feedIndex] = rect.height;
    },
    [feedCardDimensionsRef],
  );

  const firstRenderedCardRef = useFeedCardObserver(
    (wasIntersecting, isIntersecting) => {
      if (!wasIntersecting && isIntersecting && renderedRange.startIndex > 0) {
        cardKeysRef.current.unshift(cardKeysRef.current.pop() as number);
        setRenderedRange({
          startIndex: renderedRange.startIndex - 1,
          endIndex: renderedRange.endIndex - 1,
        });
      }
    },
  );

  const lastRenderedCardRef = useFeedCardObserver(
    (wasIntersecting, isIntersecting) => {
      endCardIntersectingRef.current = isIntersecting;

      if (!wasIntersecting && isIntersecting) {
        if (renderedRange.endIndex < feedData.items.length - 1) {
          cardKeysRef.current.push(cardKeysRef.current.shift() as number);
          setRenderedRange({
            startIndex: renderedRange.startIndex + 1,
            endIndex: renderedRange.endIndex + 1,
          });
        } else if (!isLoading && feedData.hasMore) {
          fetchNextPage();
        }
      }
    },
  );

  useEffect(() => {
    if (feedData.items.length === 0) {
      fetchNextPage();
    }
  }, [feedData, fetchNextPage]);

  useEffect(() => {
    const wasLoading = wasLoadingRef.current;
    wasLoadingRef.current = isLoading;
    if (
      wasLoading &&
      !isLoading &&
      endCardIntersectingRef.current &&
      renderedRange.endIndex < feedData.items.length - 2
    ) {
      setRenderedRange({
        startIndex: renderedRange.startIndex + 2,
        endIndex: renderedRange.endIndex + 2,
      });
    }
  }, [feedData, isLoading, renderedRange]);

  const getCardRef = (cardIndex: number) => {
    if (cardIndex === 0) {
      return firstRenderedCardRef;
    }
    if (cardIndex === renderedItems.length - 1) {
      return lastRenderedCardRef;
    }
    return undefined;
  };

  const renderedItems =
    feedData.items.length > 0
      ? feedData.items.slice(
          renderedRange.startIndex,
          renderedRange.endIndex + 1,
        )
      : [];
  const scrollPreservationValues = getScrollPreservationValues(
    feedCardDimensionsRef.current,
    renderedRange,
  );

  return (
    <div className={styles.app}>
      {renderedItems.length > 0 && (
        <div
          style={{
            paddingTop: scrollPreservationValues.before,
            paddingBottom: scrollPreservationValues.after,
          }}
        >
          {renderedItems.map((item, i) => (
            <FeedItemCard
              feedIndex={renderedRange.startIndex + i}
              item={item}
              key={cardKeysRef.current[i]}
              onRender={setCardDimension}
              ref={getCardRef(i)}
            />
          ))}
        </div>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
