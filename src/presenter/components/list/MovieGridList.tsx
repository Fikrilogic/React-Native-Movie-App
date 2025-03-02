import React, {useMemo} from 'react';
import {Movie} from '../../../domain/models/Movie';
import { List, Text} from '@ui-kitten/components';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';

type MovieGridListProps = {
  data: Movie[];
  maxCol: number;
  onLoadMore?: () => void;
  onClick?: (movie: Movie) => void;
};

const screenWidth = Dimensions.get('screen').width;

const MovieGridList = ({
  data,
  maxCol,
  onLoadMore,
  onClick,
}: MovieGridListProps) => {
  const MovieItem = useMemo(() => {
    return ({item, index}: {item: Movie; index: number}) => {
      return (
        <TouchableWithoutFeedback
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: screenWidth / 3,
            marginBottom: 10,
          }}
          onPress={() => {onClick?.call(null, item)}}
          >
          <View
            style={[
              styles.list_item_container,
              {
                width: '100%',
              },
            ]}>
            <MovieCatalogPlaceholder imageUrl={item.poster_path ?? ''} />
          </View>
          <Text category="s1" style={styles.list_item_title}>
            {item.title}
          </Text>
        </TouchableWithoutFeedback>
      );
    };
  }, []);

  return (
    <List
      renderItem={MovieItem}
      data={data}
      numColumns={maxCol}
      contentContainerStyle={{
        marginBottom: data.length !== 0 ? 30 : 0,
      }}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  list_item_container: {
    height: 200,
    marginHorizontal: 0,
    paddingHorizontal: 8,
  },
  list_item_title: {},
});

export default MovieGridList;
