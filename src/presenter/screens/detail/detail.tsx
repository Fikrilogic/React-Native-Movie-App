import React, {useEffect, useRef} from 'react';
import {Animated, ScrollView, StyleSheet, View, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationType, RouteNavigation} from '../../navigations';
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  useTheme,
  TopNavigation,
  TopNavigationAction,
  IconElement,
} from '@ui-kitten/components';
import {MovieCatalogPlaceholder} from '../../components';
import {useApplication} from '../../../module/AppModule';
import {useDetailMovieController} from '../../../controller/DetailMovieController';
import {ImageProps} from 'react-native-svg';

type Props = NativeStackScreenProps<
  NavigationType.RootStackParamList,
  RouteNavigation.DETAIL
>;

const maxHeight = 200;
const minHeight = 60;

const Detail = ({navigation, route}: Props) => {
  const params = route.params;

  const theme = useTheme();

  const {getMovieDetail, addMovieFavorite, getFavoriteMovie} = useApplication();
  const {fetchMovie, movie, movieFavorite, addFavorite, getFavorite} =
    useDetailMovieController(
      getMovieDetail,
      addMovieFavorite,
      getFavoriteMovie,
    );

  const scrollY = useRef(new Animated.Value(0)).current;

  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [maxHeight, minHeight],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    fetchMovie(params.movie.id ?? '0');
  }, []);

  useEffect(() => {
    getFavorite(params.movie.id ?? '0');
  }, []);

  const DetailMovieHeader = () => {
    return (
      <Layout
        level="2"
        style={[
          styles.movie_detail_header_root,
          {
            backgroundColor: 'transparent',
          },
        ]}>
        <View style={styles.movie_detail_header_image_container}>
          <MovieCatalogPlaceholder imageUrl={movie?.poster_path ?? ''} />
        </View>
        <Layout
          level="2"
          style={{
            flexDirection: 'column',
            marginStart: 16,
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          <Text category="h3">{movie?.title}</Text>
          <Text category="c2">
            {movie?.genres?.map(item => item.name ?? '').join(', ')}
          </Text>

          <Text
            category="c1"
            style={{marginTop: 8}}>{`${movie?.runtime} min`}</Text>
          <View style={styles.movie_detail_header_button_group}>
            <Button
              accessoryLeft={<Icon name="play-circle" />}
              style={{
                flex: 1,
              }}
              status="success">
              Play
            </Button>

            <Button
              status="primary"
              appearance="outline"
              style={{
                flex: 1,
                marginStart: 5,
              }}>
              Trailer
            </Button>
          </View>
        </Layout>
      </Layout>
    );
  };

  const DetailMovieContentItemText = ({
    data,
    title,
  }: {
    data: string;
    title: string;
  }) => {
    return (
      <View style={styles.movie_info_content_container}>
        <Text category="p2">{title}</Text>

        <Text
          category="p1"
          style={{
            marginTop: 5,
          }}>
          {data}
        </Text>
      </View>
    );
  };

  const DetailMovieContentItemList = ({
    data,
    title,
  }: {
    data: string[];
    title: string;
  }) => {
    return (
      <View style={styles.movie_info_content_container}>
        <Text category="p2">{title}</Text>

        <View style={styles.movie_info_content_wrap}>
          {data?.map((item, index) => (
            <View
              key={index}
              style={[
                styles.movie_info_content_wrap_item,
                {
                  backgroundColor: theme['color-primary-400'],
                },
              ]}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const ButtonFavorite = () => (
    <TopNavigationAction
      icon={
        <Icon
          name={
            +(movieFavorite?.id ?? '0') === +(params.movie?.id ?? '0')
              ? 'heart'
              : 'heart-outline'
          }
        />
      }
      onPress={() => {
        if (movie === null) return;
        addFavorite(movie);
      }}
    />
  );

  return (
    <Layout level="2" style={styles.movie_detail_root}>
      <View>
        <Animated.View
          style={{
            height: animatedHeight,
            width: '100%',
            position: 'absolute',
          }}>
          <Image
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: theme['color-primary-700'],
              opacity: 0.5,
            }}
            source={{
              uri: movie?.backdrop_path,
            }}
          />
        </Animated.View>
        <TopNavigation
          alignment="center"
          title={() => <Text category="h5">Movie</Text>}
          accessoryLeft={() => (
            <TopNavigationAction
              icon={<Icon name="arrow-back" />}
              onPress={() => navigation.goBack()}
            />
          )}
          accessoryRight={ButtonFavorite}
          style={{
            height: minHeight,
            backgroundColor: 'transparent',
          }}
        />
      </View>
      <ScrollView
        style={{
          position: 'absolute',
          top: minHeight,
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 120,
          paddingHorizontal: 16,
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <DetailMovieHeader />
        <Divider />
        <Layout
          level="2"
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Layout level="2" style={styles.movie_info_column}>
            <Text category="c1">Release Date</Text>
            <Text category="p2">{movie?.release_date}</Text>
          </Layout>
          <Divider style={{
            height: '80%',
            width: 1,
            backgroundColor: 'white'
          }}/>
          <Layout level="2" style={styles.movie_info_column}>
            <Text category="c1">Rating</Text>
            <Text category="p2">{movie?.vote_average}</Text>
          </Layout>
          <Divider style={{
            height: '80%',
            width: 1,
            backgroundColor: 'white'
          }}/>
          <Layout level="2" style={styles.movie_info_column}>
            <Text category="c1">Vote</Text>
            <Text category="p2">{movie?.vote_count}</Text>
          </Layout>
        </Layout>
        <Divider />
        <DetailMovieContentItemText
          data={movie?.overview ? movie?.overview : '-'}
          title={'Overview'}
        />
        <DetailMovieContentItemText
          data={movie?.tagline ? movie.tagline : '-'}
          title={'Tagline'}
        />
        <DetailMovieContentItemText
          data={movie?.status ?? '-'}
          title={'Status Movie'}
        />
        <DetailMovieContentItemList
          data={movie?.production_companies?.map(item => item.name ?? '') ?? []}
          title="Production Company"
        />

        <DetailMovieContentItemList
          data={movie?.spoken_languages?.map(item => item.name ?? '') ?? []}
          title="Language"
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  movie_detail_root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 0,
    paddingBottom: 16,
  },

  movie_detail_header_root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 0,
  },
  movie_detail_header_image_container: {
    height: 200,
    width: 130,
    display: 'flex',
  },
  movie_detail_header_button_group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  movie_info_column: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    flex: 1,
    alignItems: 'center',
  },
  movie_info_content_container: {
    marginTop: 10,
    display: 'flex',
  },
  movie_info_content_wrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap-reverse',
  },
  movie_info_content_wrap_item: {
    borderRadius: 5,
    marginEnd: 5,
    marginTop: 5,
    padding: 5,
    minWidth: 50,
  },
});

export default Detail;
