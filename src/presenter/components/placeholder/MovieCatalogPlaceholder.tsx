import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

type Props = {
  imageUrl: string;
};

const MovieCatalogPlaceholder = ({imageUrl}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="stretch"
        style={styles.img_content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  img_content: {
    borderRadius: 15,
    height: '100%',
    width: '100%',
    borderWidth: 1,
  },
});

export default MovieCatalogPlaceholder;
