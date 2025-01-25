import React, {useCallback, useEffect} from 'react';
import {NavigationType, RouteNavigation} from '../../../navigations/index';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Layout, useStyleSheet} from '@ui-kitten/components';
import {ScrollView, StyleSheet} from 'react-native';
import {MovieHorizontalList} from '../../../components';
import {Movie} from '../../../../domain/models/Movie';
import {useHomeController} from '../../../../controller/DashboardHomeController';
import {GetMovieNowPlayingUseCaseImpl} from '../../../../domain/usecases/GetMovieNowPlayingUseCase';
import {MovieRepositoryImpl} from '../../../../data/repository/MovieRepository';
import {ApiClientImpl} from '../../../../data/api/ApiClient';

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
  const {fetchMovieNowPlaying, moviesNowPlaying} = useHomeController(
    GetMovieNowPlayingUseCaseImpl(MovieRepositoryImpl(ApiClientImpl())),
  );

  useEffect(() => {
    fetchMovieNowPlaying();
  }, [fetchMovieNowPlaying]);
  
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchMovieNowPlaying();
  //   }, []),
  // );

  return (
    <Layout level="1" style={styles.container_row}>
      <ScrollView>
        <MovieHorizontalList
          data={moviesNowPlaying?.results ?? []}
          title="Now Playing"
        />
        <MovieHorizontalList
          data={moviesNowPlaying?.results ?? []}
          title="Upcoming"
        />
        <MovieHorizontalList
          data={moviesNowPlaying?.results ?? []}
          title="Popular"
        />
        <MovieHorizontalList
          data={moviesNowPlaying?.results ?? []}
          title="Top Rated"
        />
      </ScrollView>
    </Layout>
  );
};

const dashboardHomeStyle = StyleSheet.create({
  container_row: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default DashboardHome;
