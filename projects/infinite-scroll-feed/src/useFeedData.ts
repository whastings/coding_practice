import { useCallback, useState } from 'react';

import { APIResult, fetchFeedData } from './api';

function useFeedData(pageSize: number) {
  const [feedData, setFeedData] = useState<APIResult>({
    currentPage: 0,
    hasMore: true,
    items: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNextPage = useCallback(async () => {
    setIsLoading(true);
    const newData = await fetchFeedData(pageSize, feedData.currentPage + 1);
    setFeedData((oldFeedData) => ({
      ...newData,
      items: [...oldFeedData.items, ...newData.items],
    }));
    setIsLoading(false);
  }, [feedData, pageSize]);

  return {
    feedData,
    fetchNextPage,
    isLoading,
  };
}

export default useFeedData;
