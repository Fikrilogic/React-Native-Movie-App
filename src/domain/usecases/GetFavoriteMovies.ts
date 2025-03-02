import {MovieRepository} from '../../data/repository/MovieRepository';
import {MovieFavorite} from '../models/Movie';

export interface GetFavoriteMovies {
  call: () => Promise<MovieFavorite[]>;
}

const usecase = async (
  repository: MovieRepository,
): Promise<MovieFavorite[]> => {
  try {
    return await repository.getFavorites();
  } catch (e) {
    throw e;
  }
};

export const GetFavoriteMoviesImpl = (
  repository: MovieRepository,
): GetFavoriteMovies => ({
  call: () => usecase(repository),
});
