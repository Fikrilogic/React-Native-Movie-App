import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {NavigationType, RouteNavigation} from '../../../navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Layout, Text, TopNavigation} from '@ui-kitten/components';
import MovieVerticalList from '../../../components/list/MovieVerticalList';
import {useApplication} from '../../../../module/AppModule';
import {useFavoriteController} from '../../../../controller/DashboardFavoriteController';
import {
  LoadingSpinner,
  SpinnerType,
} from '../../../components/loading/LoadingSpinner';
import {ErrorEmptyItem} from '../../../components/error/ErrorEmptyItem';

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

  const {fetchMovie, loading, movie} = useFavoriteController(getFavoritesMovie);

  useFocusEffect(
    useCallback(() => {
      fetchMovie();
    }, []),
  );

  const navigateToDetails = (id: string) => {
    navigation.navigate(RouteNavigation.DETAIL, {id});
  };

  return (
    <Layout
      style={{
        flex: 1
      }}
    >
      <TopNavigation
        title={() => <Text category="h5">Favorite</Text>}
        alignment="center"
      />
      <Layout
        level="2"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 4
        }}>
        {loading && <LoadingSpinner type={SpinnerType.GIANT} />}
        {!loading && movie.length !== 0 && (
          <MovieVerticalList
            data={movie}
            onClick={movie => navigateToDetails(movie.id ?? '0')}
          />
        )}
        {!loading && movie.length === 0 && <ErrorEmptyItem />}
      </Layout>
    </Layout>
  );
};

export default DashboardFavorite;
