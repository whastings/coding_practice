import React from 'react';

import { FeedItemInfo } from './types';

interface Props {
  height: number;
  lastItemInfo?: FeedItemInfo;
}

export default function FeedLoadingIndicator({ height, lastItemInfo }: Props) {
  const position =
    lastItemInfo != null ? lastItemInfo.position + lastItemInfo.height : 0;
  return (
    <div
      style={{
        height,
        position: 'absolute',
        top: position,
      }}
    >
      Loading...
    </div>
  );
}
