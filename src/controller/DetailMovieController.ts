import {useCallback, useState} from 'react';
import {Movie, MovieFavorite} from '../domain/models/Movie';
import {GetMovieDetail} from '../domain/usecases/GetMovieDetail';
import {AddFavoriteMovie} from '../domain/usecases/AddFavoriteMovie';
import {GetFavoriteMovie} from '../domain/usecases/GetFavoriteMovie';

export const useDetailMovieController = (
  getDetailMovie: GetMovieDetail,
  addFavoriteMovie: AddFavoriteMovie,
  getFavoriteMovie: GetFavoriteMovie,
) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [movieFavorite, setMovieFavorite] = useState<MovieFavorite | null>(
    null,
  );

  const [loading, setLoading] = useState<boolean>();

  const fetchMovie = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const movie = await getDetailMovie.call(id);
      setMovie(movie);
    } catch (e) {
      throw e
    } finally {
      setTimeout(() => setLoading(false), 400)
    }
  }, []);

  const addFavorite = useCallback(async (movie: Movie) => {
    // setLoading(true);
    try {
      await addFavoriteMovie.call(movie);
      await getFavorite(movie.id ?? '0')
    } catch (e) {
      throw e
    } finally {
      // setTimeout(() => setLoading(false), 400)
    }
  }, []);

  const getFavorite = useCallback(async (id: string) => {
    // setLoading(true);
    try {
      const fav = await getFavoriteMovie.call(id);
      setMovieFavorite(fav);
    } catch (e) {
      throw e
    } finally {
      // setTimeout(() => setLoading(false), 400)
    }
  }, []);

  return {
    movie,
    movieFavorite,
    loading,
    fetchMovie,
    addFavorite,
    getFavorite
  };
};
