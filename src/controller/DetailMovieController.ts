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
      console.log('controller ', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (movie: Movie) => {
    setLoading(true);
    try {
      await addFavoriteMovie.call(movie);
      console.log('add getFavorite')
      await getFavorite(movie.id ?? '0')
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }, []);

  const getFavorite = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const fav = await getFavoriteMovie.call(id);
      setMovieFavorite(fav);
      console.log(`success getFavorite ${fav.title}`)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
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
