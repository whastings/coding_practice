import React from 'react'
import { NavigationSwitchScreenComponent } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import hoistNonReactStatics from 'hoist-non-react-statics'

import CurrentUserProvider from './utils/CurrentUserProvider'
import HomeScreen from './sections/home/HomeScreen'
import ReposListScreen from './sections/reposList/ReposListScreen'
import RepoScreen from './sections/repo/RepoScreen'

const Navigator = createStackNavigator(
  {
    Home: HomeScreen,
    ReposList: ReposListScreen,
    Repo: RepoScreen,
  },
  {
    initialRouteName: 'Home',
  },
)
const LoggedInNavigator: NavigationSwitchScreenComponent = (props) => {
  return (
    <CurrentUserProvider>
      <Navigator {...props} />
    </CurrentUserProvider>
  )
}

hoistNonReactStatics(LoggedInNavigator, Navigator)

export default LoggedInNavigator
