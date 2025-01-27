import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {NavigationType, RouteNavigation} from '../../../navigations';
import {Button} from '@react-navigation/elements';
import {Icon, Layout} from '@ui-kitten/components';
import InputSearch from '../../../components/input/InputSearch';
import MovieGridList from '../../../components/list/MovieGridList';
import {Movie} from '../../../../domain/models/Movie';
import {useSearchController} from '../../../../controller/DashboardSearchController';
import {useApplication} from '../../../../module/AppModule';

type DashboardSearchProps = CompositeScreenProps<
  BottomTabScreenProps<
    NavigationType.DashboardTabParamList,
    RouteNavigation.SEARCH
  >,
  NativeStackScreenProps<
    NavigationType.RootStackParamList,
    RouteNavigation.DASHBOARD
  >
>;

const DashboardSearch = ({navigation}: DashboardSearchProps) => {
  const {getMovieSearch} = useApplication();
  const {
    movie,
    search,
    fetchSubmitMovie,
    fetchPaginationMovie,
    onChangeSearch,
    setPagination,
  } = useSearchController(getMovieSearch);

  return (
    <Layout style={styles.main_container} level="1">
      <Layout level="1" style={{flex: 0, justifyContent: 'center'}}>
        <InputSearch
          value={search}
          style={styles.input_search_style}
          placeholder="Search"
          endIcon={
            <Icon
              name="search-outline"
              style={{height: 24, width: 24, tintColor: 'white'}}
            />
          }
          size="large"
          onChange={onChangeSearch}
          onSubmit={() => {
            fetchSubmitMovie();
          }}
        />
      </Layout>
      <Layout
        level="1"
        style={{
          flex: 0,
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 16,
        }}>
        <MovieGridList
          maxCol={4}
          data={movie}
          onLoadMore={() => {
            setPagination(prev => {
              console.log(prev.total_pages);
              return {page: prev.page + 1, total_pages: prev.total_pages};
            });
            fetchPaginationMovie();
          }}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  scroll_container: {
    paddingVertical: 20,
  },
  input_search_style: {
    marginHorizontal: 16,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default DashboardSearch;
