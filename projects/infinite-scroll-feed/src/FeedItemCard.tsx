import React from 'react';

import { FeedItem } from './api';
import styles from './FeedItemCard.module.css';

interface Props {
  item: FeedItem;
}

const FeedItemCard: React.FC<Props> = ({ item }) => {
  const thumbnail = item.fields?.thumbnail;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{item.webTitle}</h2>
      </div>
      {thumbnail != null && (
        <img alt="" className={styles.thumbnail} src={thumbnail} />
      )}
    </div>
  );
};

export default FeedItemCard;
