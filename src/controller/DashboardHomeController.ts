import {useCallback, useState} from 'react';
import {MovieResponse} from '../domain/models/Movie';
import {GetMovieNowPlayingUseCase} from '../domain/usecases/GetMovieNowPlayingUseCase';

export const useHomeController = (
  getMovieNowPlayingUsecase: GetMovieNowPlayingUseCase,
) => {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState<MovieResponse|null>(null);
  const [loading, setLoading] = useState<boolean>();

  const fetchMovieNowPlaying = useCallback( async () => {
    setLoading(true);
    const movies = await getMovieNowPlayingUsecase.call();
    setMoviesNowPlaying(movies);
    setLoading(false);
  }, []);

  return {
    moviesNowPlaying,
    loading,
    fetchMovieNowPlaying,
  };
};
