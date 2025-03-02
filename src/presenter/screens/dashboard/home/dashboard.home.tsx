import React, {useEffect} from 'react';
import {NavigationType, RouteNavigation} from '../../../navigations/index';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Layout,
  Text,
  TopNavigation,
  useStyleSheet,
} from '@ui-kitten/components';
import {ScrollView, StyleSheet} from 'react-native';
import {MovieHorizontalList} from '../../../components';
import {useHomeController} from '../../../../controller/DashboardHomeController';
import {useApplication} from '../../../../module/AppModule';
import {
  LoadingSpinner,
  SpinnerType,
} from '../../../components/loading/LoadingSpinner';

type DashboardHomeProps = CompositeScreenProps<
  BottomTabScreenProps<
    NavigationType.DashboardTabParamList,
    RouteNavigation.HOME
  >,
  NativeStackScreenProps<
    NavigationType.RootStackParamList,
    RouteNavigation.DASHBOARD
  >
>;

const DashboardHome = ({navigation}: DashboardHomeProps) => {
  const styles = useStyleSheet(dashboardHomeStyle);
  const {
    getMovieNowPlayingUsecase,
    getMoviePopularUsecase,
    getMovieTopRatedUsecase,
    getMovieUpcomingUsecase,
  } = useApplication();

  const {
    fetchMovie,
    loading,
    moviesNowPlaying,
    moviesPopular,
    moviesTopRated,
    moviesUpcoming,
  } = useHomeController(
    getMovieNowPlayingUsecase,
    getMoviePopularUsecase,
    getMovieTopRatedUsecase,
    getMovieUpcomingUsecase,
  );

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const navigateToDetails = (id: string) => {
    navigation.navigate(RouteNavigation.DETAIL, {id});
  };

  return (
    <Layout level="2" style={styles.container_row}>
      <TopNavigation
        title={() => <Text category="h5">Home</Text>}
        alignment="center"
      />
      {loading && (
        <Layout level="2" style={styles.loading_container}>
          <LoadingSpinner type={SpinnerType.GIANT} />
        </Layout>
      )}
      {!loading && (
        <ScrollView contentContainerStyle={styles.scroll_container}>
          <MovieHorizontalList
            data={moviesNowPlaying?.results ?? []}
            title="Now Playing"
            onClick={movie => navigateToDetails(movie?.id ?? '0')}
          />
          <MovieHorizontalList
            data={moviesUpcoming?.results ?? []}
            title="Upcoming"
            onClick={movie => navigateToDetails(movie?.id ?? '0')}
          />
          <MovieHorizontalList
            data={moviesPopular?.results ?? []}
            title="Popular"
            onClick={movie => navigateToDetails(movie?.id ?? '0')}
          />
          <MovieHorizontalList
            data={moviesTopRated?.results ?? []}
            title="Top Rated"
            onClick={movie => navigateToDetails(movie?.id ?? '0')}
          />
        </ScrollView>
      )}
    </Layout>
  );
};

const dashboardHomeStyle = StyleSheet.create({
  container_row: {
    flex: 1,
  },
  scroll_container: {
    paddingVertical: 20,
    height: 'auto',
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardHome;
