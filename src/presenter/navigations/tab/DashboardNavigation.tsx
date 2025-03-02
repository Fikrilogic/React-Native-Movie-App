import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {DashboardScreen} from '../../screens/index';
import colors from '../../../commons/theme/color';
import RouteNavigation from '../RoutesName';
import {DashboardTabParamList} from '../Type';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  useTheme,
} from '@ui-kitten/components';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const BottomTabBar = (props: BottomTabBarProps) => {
  return (
    <BottomNavigation
      selectedIndex={props.state.index}
      onSelect={index =>
        props.navigation.navigate(props.state.routeNames[index])
      }>
      <BottomNavigationTab icon={<Icon name="home" />} title="Home" />
      <BottomNavigationTab icon={<Icon name="search" />} title="Search" />
      <BottomNavigationTab icon={<Icon name="star" />} title="Favorite" />
    </BottomNavigation>
  );
};

const DashboardNavigation = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name={RouteNavigation.HOME}
        component={DashboardScreen.Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: theme['color-primary-700'],
          },
          headerTitleStyle: {
            color: colors.light,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={RouteNavigation.SEARCH}
        component={DashboardScreen.Search}
        options={{
          title: 'Search',
          headerStyle: {
            backgroundColor: theme['color-primary-700'],
          },
          headerTitleStyle: {
            color: colors.light,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={RouteNavigation.FAVORITE}
        component={DashboardScreen.Favorite}
        options={{
          title: 'Favorite',
          headerStyle: {
            backgroundColor: theme['color-primary-700'],
          },
          headerTitleStyle: {
            color: colors.light,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
