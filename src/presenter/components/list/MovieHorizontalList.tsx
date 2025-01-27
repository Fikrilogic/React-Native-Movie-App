import {Layout, List, ListItem, Text} from '@ui-kitten/components';
import React, {memo, useMemo} from 'react';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Movie} from '../../../domain/models/Movie';
import {Dimensions, StyleSheet} from 'react-native';

type MovieHorizontalListProps = {
  data: Array<Movie>;
  title: string;
};

const screenWidth = Dimensions.get('screen').width;

const MovieHorizontalList = ({data, title}: MovieHorizontalListProps) => {
  const MovieItem = useMemo(() => {
    return ({item, index}: {item: Movie; index: number}) => {
      return (
        <ListItem
          key={index}
          style={[
            styles.list_item_container,
            {
              width: screenWidth / 3 - 16,
            },
          ]}>
          <MovieCatalogPlaceholder imageUrl={item.poster_path ?? ''} />
          <Text category="s1" style={styles.list_item_title}>
            {item.title}
          </Text>
        </ListItem>
      );
    };
  }, []);

  return (
    <Layout style={styles.main_container}>
      <Text category="h4" style={styles.container_title}>
        {title}
      </Text>
      <List
        style={styles.list_main}
        data={data}
        renderItem={({item, index}) => <MovieItem item={item} index={index} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 0, margin: 0}}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 0,
    flexDirection: 'column',
    height: 240,
    marginHorizontal: 16,
  },
  container_title: {},
  list_main: {
    height: '100%',
    width: '100%',
    flexGrow: 0,
  },
  list_item_container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
  },
  list_item_title: {
  },
});

export default MovieHorizontalList;
