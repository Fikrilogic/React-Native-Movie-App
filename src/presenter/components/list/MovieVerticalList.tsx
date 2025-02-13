import React from 'react';
import {View} from 'react-native';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Button, Icon, List, Text} from '@ui-kitten/components';
import {Movie, MovieFavorite} from '../../../domain/models/Movie';

type MovieVerticalListProps = {
  data: MovieFavorite[];
};

const MovieVerticalList = (props: MovieVerticalListProps) => {
  const MovieItem = ({item, key}: {item: MovieFavorite; key: number}) => (
    <View
      key={key}
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
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
            width: '80%'
          }}>
          <Text category="h6" numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
          <Text category="p2" numberOfLines={5} ellipsizeMode="tail">
            {item.overview}
          </Text>
        </View>
        <View style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Button
            appearance="ghost"
            status="danger"
            accessoryLeft={<Icon name={'star'} />}
          />
        </View>
      </View>
    </View>
  );

  return (
    <List
      data={props.data}
      renderItem={({item, index}) => <MovieItem item={item} key={index} />}
    />
  );
};

export default MovieVerticalList;
