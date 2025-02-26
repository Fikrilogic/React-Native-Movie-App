import {MovieRepository} from '../../data/repository/MovieRepository';
import {Movie} from '../models/Movie';

export interface AddFavoriteMovie {
  call: (movie: Movie) => Promise<void>;
}

const usecase = async (
  repository: MovieRepository,
  movie: Movie,
): Promise<void> => {
  try {
    const existMovie = await repository.getFavorite(movie.id ?? '0')
    if (!existMovie) {
      await repository.addFavorite(movie);
      return;
    }
    const isFavorite = !(existMovie?.is_favorite ?? false)
    await repository.updateFavorite(movie, isFavorite)
    return;
  } catch (e) {
    throw e;
  }
};

export const AddFavoriteMovieImpl = (
  repository: MovieRepository,
): AddFavoriteMovie => ({
  call: (movie: Movie) => usecase(repository, movie),
});
