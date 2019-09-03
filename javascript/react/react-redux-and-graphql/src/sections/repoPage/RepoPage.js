import React from 'react'

import useQueryResult from '../../utils/useQueryResult'

const RepoPage = () => {
  const { data: { repository } } = useQueryResult('repo')

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
