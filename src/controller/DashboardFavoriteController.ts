import {useCallback, useState} from 'react';
import {GetFavoriteMovies} from '../domain/usecases/GetFavoriteMovies';
import {MovieFavorite} from '../domain/models/Movie';

export const useFavoriteController = (getFavoriteMovies: GetFavoriteMovies) => {
  const [movie, setMovie] = useState<MovieFavorite[]>([]);

  const [loading, setLoading] = useState<boolean>();

  const fetchMovie = useCallback(async () => {
    setLoading(true);
    try {
      const movie = await getFavoriteMovies.call();
      setMovie(movie);
      setLoading(false);
    } catch (e) {
      setMovie([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    movie,
    loading,
    fetchMovie,
  };
};
