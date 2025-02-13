import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationType, RouteNavigation} from '../../../navigations';
import {Icon, Layout, Text, TopNavigation} from '@ui-kitten/components';
import InputSearch from '../../../components/input/InputSearch';
import MovieGridList from '../../../components/list/MovieGridList';
import {useSearchController} from '../../../../controller/DashboardSearchController';
import {useApplication} from '../../../../module/AppModule';
import {
  LoadingSpinner,
  SpinnerType,
} from '../../../components/loading/LoadingSpinner';

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
    loading,
    fetchSubmitMovie,
    fetchPaginationMovie,
    onChangeSearch,
    setPagination,
  } = useSearchController(getMovieSearch);

  const navigateToDetails = (id: string) => {
    navigation.navigate(RouteNavigation.DETAIL, {id});
  };

  return (
    <Layout style={styles.main_container} level="2">
      <TopNavigation
        title={() => <Text category="h5">Search</Text>}
        alignment="center"
      />
      <Layout level="2" style={{flex: 0, justifyContent: 'center', marginTop: 8}}>
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
        level="2"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        {loading && <LoadingSpinner type={SpinnerType.GIANT} />}
        {!loading && (
          <MovieGridList
            maxCol={4}
            data={movie}
            onLoadMore={() => {
              setPagination(prev => {
                return {page: prev.page + 1, total_pages: prev.total_pages};
              });
              fetchPaginationMovie();
            }}
            onClick={movie => navigateToDetails(movie.id ?? '0')}
          />
        )}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingBottom: 20,
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
