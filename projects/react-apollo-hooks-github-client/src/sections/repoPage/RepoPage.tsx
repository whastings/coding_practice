import React from 'react'
import { useParams } from 'react-router-dom'

import { useRepoQuery } from './repoPageHooks'

interface RepoPageParams {
  owner: string,
  name: string,
}

const RepoPage: React.FC = () => {
  const { owner, name } = useParams<RepoPageParams>()
  const { data, loading } = useRepoQuery({ owner, name })

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

  return (
    <>
      <h1>{repository.name}</h1>
      <div>
        <strong>Stars: </strong> {repository.stargazers.totalCount}
      </div>
    </>
  )
}

export default RepoPage
