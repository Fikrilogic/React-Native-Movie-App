import React, {useMemo} from 'react';
import {Movie} from '../../../domain/models/Movie';
import {Layout, List, ListItem, Text} from '@ui-kitten/components';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Dimensions, StyleSheet, View} from 'react-native';

type MovieGridListProps = {
  data: Movie[];
  maxCol: number;
  onLoadMore?: () => void
};

const screenWidth = Dimensions.get('screen').width;

const MovieGridList = ({data, maxCol, onLoadMore}: MovieGridListProps) => {
  const MovieItem = useMemo(() => {
    return ({item, index}: {item: Movie; index: number}) => {
      return (
        <Layout
          key={index}
          level='1'
          style={[
            styles.list_item_container,
            {
              width: screenWidth / 3,
            },
          ]}
          >
          <MovieCatalogPlaceholder imageUrl={item.poster_path ?? ''} />
          <Text category="s1" style={styles.list_item_title}>
            {item.title}
          </Text>
        </Layout>
      );
    };
  }, []);

  return (
    <List
      renderItem={MovieItem}
      data={data}
      numColumns={maxCol}
      contentContainerStyle={{
        marginBottom: data.length !== 0 ? 30 : 0
      }}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  list_item_container: {
    display: 'flex',
    flexDirection: 'column',
    height: 250,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  list_item_title: {},
});

export default MovieGridList;
