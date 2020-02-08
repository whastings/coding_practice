import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import About from '../components/About';
import ListNavigator from './ListNavigator';

const ROUTE_ICONS = {
  List: 'list',
  About: 'info-circle',
};

const TabNavigator = createBottomTabNavigator(
  {
    List: { screen: ListNavigator },
    About: { screen: About },
  },
  {
    defaultNavigationOptions({ navigation }) {
      return {
        tabBarIcon({ tintColor }) {
          const iconName = ROUTE_ICONS[navigation.state.routeName];
          return (
            <Icon name={iconName} color={tintColor} size={22} />
          );
        },
        tabBarOptions: {
          activeBackgroundColor: '#e6f0fa',
        },
      };
    },
  },
);

export default TabNavigator;
