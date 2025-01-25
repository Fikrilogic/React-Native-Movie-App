import React from 'react';
import {Card} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';

type Props = {
  imageUrl: string;
};

const MovieCatalogPlaceholder = ({imageUrl}: Props) => {
  return (
    <Card style={styles.container} >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: '80%',
    width: '100%',
    borderWidth: 1,
  },
});

export default MovieCatalogPlaceholder;
