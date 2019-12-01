import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator } from 'react-navigation'

import HomeScreen from './sections/home/HomeScreen'
import LoadingScreen from './sections/loading/LoadingScreen'
import LoginScreen from './sections/login/LoginScreen'
import RepoScreen from './sections/repo/RepoScreen'

const LoggedInNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Repo: RepoScreen,
  },
  {
    initialRouteName: 'Home',
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
