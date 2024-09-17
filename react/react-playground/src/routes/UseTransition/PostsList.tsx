import { useSuspenseQuery } from "@tanstack/react-query";
import { getPosts } from "./postQueries";

interface Props {
  isChangingPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  page: number;
}

function PostsList({ isChangingPage, onNextPage, onPrevPage, page }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["getPosts", page],
    queryFn: () => getPosts(page),
  });
  const { posts } = data;

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <strong>Page: </strong>
        {page}
        {isChangingPage && " (Loading...)"}
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={onPrevPage}>
        Previous Page
      </button>
      <button disabled={isChangingPage} onClick={onNextPage}>
        Next Page
      </button>
    </div>
  );
}

export default PostsList;
