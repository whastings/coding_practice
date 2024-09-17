import { Suspense, useState, useTransition } from "react";
import PostsList from "./PostsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function UseTransition() {
  const [page, setPage] = useState(1);
  const [isTransitionPending, startTransition] = useTransition();

  const goToNextPage = () => {
    startTransition(() => setPage(page + 1));
  };

  const goToPrevPage = () => {
    startTransition(() => setPage(page - 1));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>useTransition</h1>
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostsList
            isChangingPage={isTransitionPending}
            onNextPage={goToNextPage}
            onPrevPage={goToPrevPage}
            page={page}
          />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default UseTransition;
