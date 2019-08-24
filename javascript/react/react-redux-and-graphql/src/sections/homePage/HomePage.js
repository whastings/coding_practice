import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import graphqlClient from '../../utils/graphqlClient'
import { fetchMoreRepos } from './homePageRedux'

const useQueryResult = (queryName) => {
  const resultRef = React.useRef(null)
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)

  if (!resultRef.current) {
    resultRef.current = { data: graphqlClient.readQuery(queryName) }
  }

  React.useEffect(() => {
    return graphqlClient.subscribeToQuery(queryName, (result) => {
      resultRef.current = result
      forceUpdate()
    })
  }, [queryName])

  return resultRef.current
}

const HomePage = () => {
  const dispatch = useDispatch()
  const queryResult = useQueryResult('ownRepos')
  const ownRepos = queryResult.data.viewer.repositories

  const handleLoadMore = () => {
    dispatch(fetchMoreRepos())
  }

  return (
    <>
      <h1>Your Repos</h1>
      <ul>
        {ownRepos.edges.map(({ node }) => (
          <li key={node.name}>
            <Link to={'/repos/foo'}>{node.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </>
  )
}

export default HomePage
