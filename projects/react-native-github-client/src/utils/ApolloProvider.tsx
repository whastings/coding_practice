import React, { useMemo } from 'react'
import { ApolloProvider as WrappedProvider } from '@apollo/client'

import { useAuthContext } from './authContext'
import initApolloClient from './initApolloClient'

const ApolloProvider: React.FC = ({ children }) => {
  const { apiToken } = useAuthContext().state
  const apolloClient = useMemo(() => initApolloClient(apiToken || ''), [apiToken])

  return (
    <WrappedProvider client={apolloClient}>
      {children}
    </WrappedProvider>
  )
}

export default ApolloProvider
