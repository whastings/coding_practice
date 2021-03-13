export interface FeedItem {
  fields?: {
    thumbnail?: string;
  };
  id: string;
  webTitle: string;
}

interface FeedAPIData {
  response: {
    currentPage: number;
    pages: number;
    results: FeedItem[];
    status: string;
  };
}

export interface APIResult {
  currentPage: number;
  hasMore: boolean;
  items: FeedItem[];
}

const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const API_URL = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=thumbnail`;

export const fetchFeedData = async (
  pageSize: number,
  nextPage: number,
): Promise<APIResult> => {
  const response = await window.fetch(
    `${API_URL}&page-size=${pageSize}&page=${nextPage}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    },
  );

  const data: FeedAPIData | null = response.ok ? await response.json() : null;

  if (data == null || data.response.status !== 'ok') {
    throw new Error('API request failed');
  }

  const { currentPage, pages, results } = data.response;
  return { currentPage, hasMore: currentPage < pages, items: results };
};
