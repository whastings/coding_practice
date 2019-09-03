import React from 'react'

import graphqlClient from './graphqlClient'

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

export default useQueryResult
