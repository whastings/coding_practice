import { createAppContainer, createStackNavigator } from 'react-navigation';

import RestaurantsList from './src/components/RestaurantsList';
import RestaurantInfo from './src/components/RestaurantInfo';

const AppNavigator = createStackNavigator({
  Home: { screen: RestaurantsList },
  Info: { screen: RestaurantInfo },
});

export default createAppContainer(AppNavigator);
