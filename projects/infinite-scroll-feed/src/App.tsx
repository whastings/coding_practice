import React, { useEffect, useState } from 'react';

import { fetchFeedItems, FeedItem } from './api';
import styles from './App.module.css';
import FeedItemCard from './FeedItemCard';

function App() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (feedItems.length === 0) {
      fetchFeedItems().then((newFeedItems) => {
        setFeedItems(newFeedItems);
      });
    }
  }, [feedItems]);

  if (feedItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      {feedItems.map((item) => (
        <FeedItemCard item={item} key={item.id} />
      ))}
    </div>
  );
}

export default App;
