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
    await repository.addFavorite(movie);
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
