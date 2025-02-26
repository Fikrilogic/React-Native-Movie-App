import { showToastSuccess } from '../../commons/utils/toast';
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
      showToastSuccess('Success Added to Favorite')
      return;
    }
    const isFavorite = !(existMovie?.is_favorite ?? false)
    await repository.updateFavorite(movie, isFavorite)
    showToastSuccess(isFavorite ? 'Success Added to Favorite' : 'Success remove from Favorite')
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
