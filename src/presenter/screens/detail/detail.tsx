import {Button, Text} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationType, RouteNavigation} from '../../navigations';

type Props = NativeStackScreenProps<
  NavigationType.RootStackParamList,
  RouteNavigation.DETAIL
>;

const Detail = ({navigation, route}: Props) => {
  return (
    <View>
      <Text>Detail</Text>
      <Button
        onPress={() => {
          navigation.navigate(RouteNavigation.DASHBOARD, {
            screen: RouteNavigation.FAVORITE,
          });
        }}>
        Click Here {route.name}
      </Button>
    </View>
  );
};

export default Detail;
