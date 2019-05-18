import { createStackNavigator } from 'react-navigation';

import AddReview from '../components/AddReview';
import TabNavigator from './TabNavigator';

const AppNavigator = createStackNavigator(
  {
    Tabs: { screen: TabNavigator },
    AddReview: { screen: AddReview },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

export default AppNavigator;
