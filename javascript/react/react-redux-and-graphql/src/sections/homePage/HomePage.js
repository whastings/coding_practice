import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useQueryResult from '../../utils/useQueryResult'
import { fetchMoreRepos } from './homePageRedux'
import { getRequestState } from '../../utils/networkRedux'

const HomePage = () => {
  const dispatch = useDispatch()
  const queryResult = useQueryResult('ownRepos')
  const queryState = useSelector((state) => getRequestState(state, 'ownRepos'))
  const ownRepos = queryResult.data.viewer.repositories
  const { hasNextPage } = queryResult.data.viewer.repositories.pageInfo

  const handleLoadMore = () => {
    dispatch(fetchMoreRepos())
  }

  return (
    <>
      <h1>Your Repos</h1>
      <ul>
        {ownRepos.edges.map(({ node }) => (
          <li key={node.name}>
            <Link to={`/repos/${node.owner.login}/${node.name}`}>
              {node.name}
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={handleLoadMore} disabled={queryState.loading}>
          Load More
        </button>
      )}
    </>
  )
}

export default HomePage
