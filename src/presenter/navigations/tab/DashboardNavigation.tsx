import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {DashboardScreen} from '../../screens/index';
import colors from '../../../commons/theme/color';
import {Pressable} from 'react-native';
import RouteNavigation from '../RoutesName';
import {DashboardTabParamList} from '../Type';
import {Icon, useTheme} from '@ui-kitten/components';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const getTabBarIcon = (routeName: string, focused: boolean, size: number, color: string) => {
  let iconName: string;

  switch (routeName) {
    case RouteNavigation.HOME:
      iconName = focused ? 'home' : 'home-outline';
      break;
    case RouteNavigation.SEARCH:
      iconName = focused ? 'search' : 'search-outline';
      break;
    case RouteNavigation.FAVORITE:
      iconName = focused ? 'star' : 'star-outline';
      break;
    default:
      iconName = focused ? 'home' : 'home-outline';
      break;
  }

  return (
    <Icon
      name={iconName}
      style={{
        width: size,
        height: size,
      }}
      fill={color}
    />
  );
};

const DashboardNavigation = () => {

  const theme = useTheme();

  const customRippleTabButton = (props: BottomTabBarButtonProps) => (
    <Pressable
      {...props}
      android_ripple={{
        color: colors.primaryLight,
        foreground: false,
        borderless: false,
      }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          return getTabBarIcon(route.name, focused, size, color);
        },
        tabBarStyle: {
          backgroundColor: theme['color-primary-700'],
        },
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.light,
        animation: 'shift',
        tabBarButton: customRippleTabButton,
      })}>
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
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
