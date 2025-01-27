import {useCallback, useState} from 'react';
import {MovieResponse} from '../domain/models/Movie';
import {GetMovieNowPlayingUseCase} from '../domain/usecases/GetMovieNowPlayingUseCase';
import {GetMoviePopularUseCase} from '../domain/usecases/GetMoviePopularUseCase';
import {GetMovieTopRatedUseCase} from '../domain/usecases/GetMovieTopRatedUseCase';
import {GetMovieUpcomingUseCase} from '../domain/usecases/GetMovieUpcomingUseCase';

export const useHomeController = (
  getMovieNowPlayingUsecase: GetMovieNowPlayingUseCase,
  getMoviePopularUsecase: GetMoviePopularUseCase,
  getMovieTopRatedUsecase: GetMovieTopRatedUseCase,
  getMovieUpcomingUsecase: GetMovieUpcomingUseCase,
) => {
  const [moviesNowPlaying, setMoviesNowPlaying] =
    useState<MovieResponse | null>(null);
  const [moviesUpcoming, setMoviesUpcoming] = useState<MovieResponse | null>(
    null,
  );
  const [moviesTopRated, setMoviesTopRated] = useState<MovieResponse | null>(
    null,
  );
  const [moviesPopular, setMoviesPopular] = useState<MovieResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>();

  const fetchMovie = useCallback(async () => {
    setLoading(true);
    const [nowPlaying, popular, toprated, upcoming] = await Promise.all([
      getMovieNowPlayingUsecase.call(),
      getMoviePopularUsecase.call(),
      getMovieTopRatedUsecase.call(),
      getMovieUpcomingUsecase.call(),
    ]);
    setMoviesNowPlaying(nowPlaying);
    setMoviesUpcoming(upcoming);
    setMoviesTopRated(toprated);
    setMoviesPopular(popular);
    setLoading(false);
  }, []);

  return {
    moviesNowPlaying,
    moviesPopular,
    moviesTopRated,
    moviesUpcoming,
    loading,
    fetchMovie,
  };
};
