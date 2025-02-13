import React from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {DashboardScreen} from '../../screens/index';
import colors from '../../../commons/theme/color';
import {Pressable} from 'react-native';
import RouteNavigation from '../RoutesName';
import {DashboardTabParamList} from '../Type';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  useTheme,
} from '@ui-kitten/components';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const getTabBarIcon = (
  routeName: string,
  focused: boolean,
  size: number,
  color: string,
) => {
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

const BottomTabBar = (props: BottomTabBarProps) => {
  return (
    <BottomNavigation
      selectedIndex={props.state.index}
      onSelect={index =>
        props.navigation.navigate(props.state.routeNames[index])
      }
      >
      <BottomNavigationTab icon={<Icon name="home" />} title="Home" />
      <BottomNavigationTab icon={<Icon name="search" />} title="Search" />
      <BottomNavigationTab icon={<Icon name="star" />} title="Favorite" />
    </BottomNavigation>
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
      tabBar={props => <BottomTabBar {...props} />}
      >
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
          headerShown: false
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
          headerShown: false
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
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
