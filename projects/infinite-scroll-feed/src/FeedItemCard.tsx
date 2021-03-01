import React, { forwardRef, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { FeedItem } from './api';
import styles from './FeedItemCard.module.css';
import useResizeObserver from './useResizeObserver';

interface Props {
  feedIndex: number;
  item: FeedItem;
  onRender: (rect: DOMRect, feedIndex: number) => void;
}

const FeedItemCard = forwardRef<HTMLDivElement, Props>(
  ({ feedIndex, item, onRender }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const thumbnail = item.fields?.thumbnail;

    useEffect(() => {
      if (containerRef.current == null) {
        throw new Error('Container ref not set');
      }
      const containerRect = containerRef.current.getBoundingClientRect();
      onRender(containerRect, feedIndex);
    }, []);

    const observerRef = useResizeObserver((entries) => {
      const [entry] = entries;
      onRender(entry.contentRect, feedIndex);
    });

    return (
      <div
        className={styles.container}
        ref={mergeRefs([containerRef, observerRef, ref])}
      >
        <div className={styles.content}>
          <h2 className={styles.heading}>{item.webTitle}</h2>
        </div>
        {thumbnail != null && (
          <img alt="" className={styles.thumbnail} src={thumbnail} />
        )}
      </div>
    );
  },
);

export default FeedItemCard;
