import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './Type';
import RouteNavigation from './RoutesName';
import DashboardNavigation from './tab/DashboardNavigation';
import { DetailScreen } from '../screens';
import colors from '../../commons/theme/color';
import { useTheme } from '@ui-kitten/components';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={RouteNavigation.DASHBOARD}
          component={DashboardNavigation}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={RouteNavigation.DETAIL}
          component={DetailScreen}
          options={{
            title: 'Detail',
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
