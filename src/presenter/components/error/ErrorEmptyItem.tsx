import {Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleProp, View, ViewStyle} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const ErrorEmptyItem = ({style}: Props) => {
  return (
    <View
      style={[
        style,
        {display: 'flex', justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Image
        source={require('./../../../commons/assets/empty_data.png')}
        style={{
          width: 250,
          height: 180,
        }}
      />
      <Text category="h6">Item Kosong</Text>
    </View>
  );
};
