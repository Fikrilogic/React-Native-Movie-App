import React, {useEffect} from 'react';
import {NavigationType, RouteNavigation} from '../../../navigations/index';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Layout, useStyleSheet} from '@ui-kitten/components';
import {ScrollView, StyleSheet} from 'react-native';
import {MovieHorizontalList} from '../../../components';
import {useHomeController} from '../../../../controller/DashboardHomeController';
import {useApplication} from '../../../../module/AppModule';
import { Movie } from '../../../../domain/models/Movie';

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

const DashboardHome = ({navigation, route}: DashboardHomeProps) => {
  const styles = useStyleSheet(dashboardHomeStyle);
  const {
    getMovieNowPlayingUsecase,
    getMoviePopularUsecase,
    getMovieTopRatedUsecase,
    getMovieUpcomingUsecase,
  } = useApplication();

  const {fetchMovie, moviesNowPlaying, moviesPopular, moviesTopRated, moviesUpcoming} = useHomeController(
    getMovieNowPlayingUsecase,
    getMoviePopularUsecase,
    getMovieTopRatedUsecase,
    getMovieUpcomingUsecase,
  );

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const navigateToDetails = (movie: Movie) => {
    navigation.navigate(RouteNavigation.DETAIL, {movie})
  }

  return (
    <Layout level="2" style={styles.container_row}>
      <ScrollView  contentContainerStyle={styles.scroll_container}>
        <MovieHorizontalList
          data={moviesNowPlaying?.results ?? []}
          title="Now Playing"
          onClick={(movie) => navigateToDetails(movie)}
        />
        <MovieHorizontalList
          data={moviesUpcoming?.results ?? []}
          title="Upcoming"
          onClick={(movie) => navigateToDetails(movie)}
        />
        <MovieHorizontalList
          data={moviesPopular?.results ?? []}
          title="Popular"
          onClick={(movie) => navigateToDetails(movie)}
        />
        <MovieHorizontalList
          data={moviesTopRated?.results ?? []}
          title="Top Rated"
          onClick={(movie) => navigateToDetails(movie)}
        />
      </ScrollView>
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
  }
});

export default DashboardHome;
