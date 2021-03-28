import React from 'react';

import { FeedItem } from './api';
import styles from './FeedItemCard.module.css';

interface Props {
  item: FeedItem;
}

const FeedItemCard = React.memo<Props>(({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{item.webTitle}</h2>
      </div>
    </div>
  );
});

export default FeedItemCard;
