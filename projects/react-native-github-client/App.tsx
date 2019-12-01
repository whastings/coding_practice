import React, { useRef } from 'react'
import { createAppContainer, NavigationActions, NavigationContainerComponent } from 'react-navigation'

import AppNavigator from './src/AppNavigator'
import ApolloProvider from './src/utils/ApolloProvider'
import { AuthProvider } from './src/utils/authContext'

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  const navigatorRef = useRef<NavigationContainerComponent>()
  const handleAuth = (isLoggedIn: boolean) => {
    const nextScreen = isLoggedIn ? 'LoggedIn' : 'Login'
    navigatorRef.current!.dispatch(
      NavigationActions.navigate({ routeName: nextScreen })
    )
  }

  return (
    <AuthProvider onAuth={handleAuth}>
      <ApolloProvider>
        <AppContainer
          ref={(navigator) => { navigatorRef.current = navigator! }}
        />
      </ApolloProvider>
    </AuthProvider>
  )
}
