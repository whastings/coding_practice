import { createStackNavigator } from 'react-navigation';

import RestaurantsList from '../components/RestaurantsList';
import RestaurantInfo from '../components/RestaurantInfo';

const ListNavigator = createStackNavigator(
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

export default ListNavigator;
