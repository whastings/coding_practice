interface Post {
  body: string;
  id: number;
  title: string;
}

interface PostsData {
  limit: number;
  posts: Post[];
  skip: number;
  total: number;
}

const LIMIT = 10;

export async function getPosts(page: number): Promise<PostsData> {
  const skip = LIMIT * (page - 1);
  const response = await fetch(
    `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}&delay=2000`
  );

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
