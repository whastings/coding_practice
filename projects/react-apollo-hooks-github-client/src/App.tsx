import React from 'react'

import './App.css'
import Router from './Router'
import ApolloProvider from './utils/ApolloProvider'
import { AuthProvider } from './utils/authContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Router />
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
