import {Layout, List, ListItem, Text} from '@ui-kitten/components';
import React from 'react';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Movie} from '../../../domain/models/Movie';
import {Dimensions, StyleSheet} from 'react-native';

type MovieHorizontalListProps = {
  data: Array<Movie>;
  title: string;
};

const screenWidth = Dimensions.get('window').width;

const MovieHorizontalList = ({data, title}: MovieHorizontalListProps) => {
  const renderItem = ({item, index}: {item: Movie; index: number}) => {
    return (
      <ListItem
        key={index}
        style={[
          styles.list_item_container,
          {
            width: screenWidth / 3,
          },
        ]}>
        <MovieCatalogPlaceholder imageUrl={item.poster_path} />
        <Text category="h6" style={styles.list_item_title}>
          {item.title}
        </Text>
      </ListItem>
    );
  };

  return (
    <Layout style={styles.main_container}>
      <Text category="h6" style={styles.container_title}>
        {title}
      </Text>
      <List
        style={styles.list_main}
        data={data}
        renderItem={renderItem}
        horizontal={true}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 0,
    flexDirection: 'column',
    height: 240,
    paddingVertical: 8,
  },
  container_title: {
    marginStart: 16,
  },
  list_main: {
    height: '100%',
    flexGrow: 0,
  },
  list_item_container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
  },
  list_item_title: {
    fontSize: 16,
    fontWeight: 500,
  },
});

export default MovieHorizontalList;
