import React from 'react'

import { useOwnReposQuery } from './homePageHooks'

const HomePage: React.FC = () => {
  const { fetchMore, hasNextPage, loading, loadingMore, repos } = useOwnReposQuery()

  if (loading || !repos) {
    return (
      <strong>Loading...</strong>
    )
  }

  return (
    <>
      <h1>Your Repos</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo!.name}>
            {repo!.name}
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={fetchMore} disabled={loadingMore}>
          Load More
        </button>
      )}
    </>
  )
}

export default HomePage
