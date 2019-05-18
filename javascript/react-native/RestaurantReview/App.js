import { createAppContainer, createStackNavigator } from 'react-navigation';

import RestaurantsList from './src/components/RestaurantsList';
import RestaurantInfo from './src/components/RestaurantInfo';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: RestaurantsList },
    Info: { screen: RestaurantInfo },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0066CC',
        color: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
