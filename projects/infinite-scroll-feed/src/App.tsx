import React, { useEffect, useRef, useState } from 'react';

import { APIResult, fetchFeedData } from './api';
import styles from './App.module.css';
import FeedItemCard from './FeedItemCard';
import useIntersectionObserver from './useIntersectionObserver';

function App() {
  const [feedData, setFeedData] = useState<APIResult>({
    currentPage: 0,
    hasMore: true,
    items: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNextPage = async () => {
    setIsLoading(true);
    const newData = await fetchFeedData(feedData.currentPage + 1);
    setIsLoading(false);
    setFeedData((oldFeedData) => ({
      ...newData,
      items: [...oldFeedData.items, ...newData.items],
    }));
  };

  const observerRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        feedData.items.length > 0 &&
        feedData.hasMore &&
        !isLoading
      ) {
        fetchNextPage();
      }
    },
    { rootMargin: '0px 0px 500px 0px' },
  );

  useEffect(() => {
    if (feedData.items.length === 0) {
      fetchNextPage();
    }
  }, [feedData.items]);

  return (
    <div className={styles.app}>
      {feedData.items.length > 0 &&
        feedData.items.map((item) => (
          <FeedItemCard item={item} key={item.id} />
        ))}
      {isLoading && <div>Loading...</div>}
      <div ref={observerRef} />
    </div>
  );
}

export default App;
