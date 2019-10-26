import React from 'react'
import { Link } from 'react-router-dom'

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
            <Link to={`/repos/${repo!.owner.login}/${repo!.name}`}>
              {repo!.name}
            </Link>
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
