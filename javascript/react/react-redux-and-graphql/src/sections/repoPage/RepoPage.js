import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleRepoStar } from './repoPageRedux'
import useQueryResult from '../../utils/useQueryResult'
import { getRequestState } from '../../utils/networkRedux'

const RepoPage = () => {
  const { data: { repository } } = useQueryResult('repo')
  const dispatch = useDispatch()
  const toggleStarRequestState = useSelector((state) => getRequestState(state, 'toggleRepoStar'))

  const handleToggleButtonClick = () => dispatch(toggleRepoStar())
  const toggleStarButtonText = repository.viewerHasStarred ? 'Remove Star' : 'Add Star'

  return (
    <>
      <h1>{repository.name}</h1>
      <div>
        <strong>Stars: </strong> {repository.stargazers.totalCount}
      </div>
      <div>
        <button onClick={handleToggleButtonClick} disabled={toggleStarRequestState.loading}>
          {toggleStarButtonText}
        </button>
      </div>
    </>
  )
}

export default RepoPage
