import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import { NavigationType, RouteNavigation } from '../../../navigations';
import { Button } from '@react-navigation/elements';

type DashboardSearchProps = CompositeScreenProps<
  BottomTabScreenProps<
    NavigationType.DashboardTabParamList,
    RouteNavigation.SEARCH
  >,
  NativeStackScreenProps<
    NavigationType.RootStackParamList,
    RouteNavigation.DASHBOARD
  >
>;

const DashboardSearch = ({navigation}: DashboardSearchProps) => {
  return (
    <View>
      <Text>Search</Text>
      <Button
              onPress={() => {
                navigation.navigate(RouteNavigation.DETAIL);
              }}>
              Click Here
            </Button>
    </View>
  );
};

export default DashboardSearch;
