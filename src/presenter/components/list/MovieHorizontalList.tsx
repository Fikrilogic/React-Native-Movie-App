import {Layout, List, ListItem, Text} from '@ui-kitten/components';
import React, {memo, useMemo} from 'react';
import MovieCatalogPlaceholder from '../placeholder/MovieCatalogPlaceholder';
import {Movie} from '../../../domain/models/Movie';
import {Dimensions, StyleSheet, View} from 'react-native';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

type MovieHorizontalListProps = {
  data: Array<Movie>;
  title: string;
  onClick?: (movie: Movie) => void;
};

const screenWidth = Dimensions.get('screen').width;

const MovieHorizontalList = ({
  data,
  title,
  onClick,
}: MovieHorizontalListProps) => {
  const MovieItem = useMemo(() => {
    return ({item, index}: {item: Movie; index: number}) => {
      return (
        <TouchableWithoutFeedback
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: screenWidth / 3,
            marginEnd: 10,
            alignItems: 'center'
          }}
          onPress={() => {
            onClick?.call(null, item);
          }}>
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
    <Layout level='2' style={styles.main_container}>
      <Text category="h4">{title}</Text>
      <List
      style={{
        marginTop: 10
      }}
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
    justifyContent: 'space-between',
    height: 300,
    marginHorizontal: 8,
    marginTop: 8
  },
  list_item_container: {
    height: '90%',
  },
  list_item_title: {
    marginTop: 5
  },
});

export default MovieHorizontalList;
