import React from 'react';
import {View} from 'react-native';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Button, Icon, List, Text} from '@ui-kitten/components';
import {Movie, MovieFavorite} from '../../../domain/models/Movie';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

type MovieVerticalListProps = {
  data: MovieFavorite[];
  onClick?: (movie: MovieFavorite) => void;
};

const MovieVerticalList = (props: MovieVerticalListProps) => {
  const MovieItem = ({item, key}: {item: MovieFavorite; key: number}) => (
    <TouchableWithoutFeedback
      key={key}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
      onPress={() => {
        props.onClick?.call(null, item);
      }}
      >
      <View
        style={{
          height: '100%',
          width: '30%',
          marginRight: 16,
        }}>
        <MovieCatalogPlaceholder imageUrl={item.poster_path ?? ''} />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '95%',
          }}>
          <Text category="h6" numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
          <Text category="p2" numberOfLines={5} ellipsizeMode="tail">
            {item.overview}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <List
      data={props.data}
      renderItem={({item, index}) => <MovieItem item={item} key={index} />}
    />
  );
};

export default MovieVerticalList;
