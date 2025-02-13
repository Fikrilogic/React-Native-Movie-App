import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {NavigationType, RouteNavigation} from '../../../navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Layout} from '@ui-kitten/components';
import {Movie} from '../../../../domain/models/Movie';
import MovieVerticalList from '../../../components/list/MovieVerticalList';
import {useApplication} from '../../../../module/AppModule';
import {useFavoriteController} from '../../../../controller/DashboardFavoriteController';

type DashboardFavoriteProps = CompositeScreenProps<
  BottomTabScreenProps<
    NavigationType.DashboardTabParamList,
    RouteNavigation.FAVORITE
  >,
  NativeStackScreenProps<
    NavigationType.RootStackParamList,
    RouteNavigation.DASHBOARD
  >
>;


const DashboardFavorite = ({navigation}: DashboardFavoriteProps) => {
  const {getFavoritesMovie} = useApplication();

  const {fetchMovie, movie} = useFavoriteController(getFavoritesMovie);

  useFocusEffect(useCallback(() => {
    fetchMovie();
  }, []))

  return (
    <Layout
      level="2"
      style={{
        flex: 1,
      }}>
      <MovieVerticalList data={movie} />
    </Layout>
  );
};

export default DashboardFavorite;
