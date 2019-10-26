import React from 'react'

import { useRepoQuery, useToggleStarMutation } from './repoPageHooks'

interface RepoPageParams {
  owner: string,
  name: string,
}

const RepoPage: React.FC = () => {
  const { data, loading } = useRepoQuery()
  const [toggleStar, { loading: toggleStarLoading }] = useToggleStarMutation()

  if (loading) {
    return (
      <strong>Loading...</strong>
    )
  }

  if (!data || !data.repository) {
    return (
      <h1>Not Found</h1>
    )
  }

  const { repository } = data
  const toggleStarButtonText = repository.viewerHasStarred ? 'Remove Star' : 'Add Star'
  const handleToggleStarClick = () => {
    toggleStar()
  }

  return (
    <>
      <h1>{repository.name}</h1>
      <div>
        <strong>Stars: </strong> {repository.stargazers.totalCount}
      </div>
      <div>
        <button onClick={handleToggleStarClick} disabled={toggleStarLoading}>
          {toggleStarButtonText}
        </button>
      </div>
    </>
  )
}

export default RepoPage
