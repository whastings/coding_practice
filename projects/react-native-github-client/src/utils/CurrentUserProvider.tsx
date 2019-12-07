import React, { createContext, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Text } from 'react-native'

import { ViewerQuery, ViewerQuery_viewer } from './types/ViewerQuery'

const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewer {
      login
    }
  }
`

const CurrentUserContext = createContext<ViewerQuery_viewer | null>(null)

export const useCurrentUser = () => useContext(CurrentUserContext)

const CurrentUserProvider: React.FC = (props) => {
  const { data, loading } = useQuery<ViewerQuery>(VIEWER_QUERY)

  if (loading || !data) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <CurrentUserContext.Provider value={data.viewer}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider
