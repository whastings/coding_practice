import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator } from 'react-navigation'

import ReposListScreen from './sections/reposList/ReposListScreen'
import LoadingScreen from './sections/loading/LoadingScreen'
import LoginScreen from './sections/login/LoginScreen'
import RepoScreen from './sections/repo/RepoScreen'

const LoggedInNavigator = createStackNavigator(
  {
    ReposList: ReposListScreen,
    Repo: RepoScreen,
  },
  {
    initialRouteName: 'ReposList',
  },
)
const AppNavigator = createSwitchNavigator(
  {
    LoggedIn: LoggedInNavigator,
    Login: LoginScreen,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Loading',
  },
)

export default AppNavigator
