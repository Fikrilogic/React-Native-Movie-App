import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationType, RouteNavigation} from '../../../navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@react-navigation/elements';

type DashboardFavoriteProps = CompositeScreenProps<
  BottomTabScreenProps<
    NavigationType.DashboardTabParamList,
    RouteNavigation.FAVORITE
  >,
  NativeStackScreenProps<
    NavigationType.RootStackParamList,
    RouteNavigation.DASHBOARD
  >
>;

const DashboardFavorite = ({navigation}: DashboardFavoriteProps) => {
  return (
    <View>
      <Text>Favorite</Text>
      <Button
        onPress={() => {
          navigation.navigate(RouteNavigation.DETAIL);
        }}>
        Click Here
      </Button>
    </View>
  );
};

export default DashboardFavorite;
