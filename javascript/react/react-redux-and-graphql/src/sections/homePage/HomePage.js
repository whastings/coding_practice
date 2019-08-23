import React from 'react'
import { Link } from 'react-router-dom'

import graphqlClient from '../../utils/graphqlClient'

const useQueryResult = (queryName) => {
  const resultRef = React.useRef(null)
  if (!resultRef.current) {
    resultRef.current = graphqlClient.readQuery(queryName)
  }
  return resultRef.current
}

const HomePage = () => {
  const ownRepos = useQueryResult('ownRepos').viewer.repositories
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
    </>
  )
}

export default HomePage
