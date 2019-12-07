import { createSwitchNavigator } from 'react-navigation'

import LoadingScreen from './sections/loading/LoadingScreen'
import LoggedInNavigator from './LoggedInNavigator'
import LoginScreen from './sections/login/LoginScreen'

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
