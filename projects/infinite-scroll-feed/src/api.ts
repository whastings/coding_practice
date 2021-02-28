export interface FeedItem {
  fields: {
    thumbnail: string;
  };
  id: string;
  webTitle: string;
}

interface FeedAPIData {
  response: {
    results: FeedItem[];
    status: string;
  };
}

const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const API_URL = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=thumbnail`;

export const fetchFeedItems = async (): Promise<FeedItem[]> => {
  const response = await window.fetch(API_URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });

  const data: FeedAPIData | null = response.ok ? await response.json() : null;

  if (data == null || data.response.status !== 'ok') {
    throw new Error('API request failed');
  }

  return data.response.results;
};
