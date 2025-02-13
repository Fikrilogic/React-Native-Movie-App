import {MovieRepository} from '../../data/repository/MovieRepository';
import {Movie, MovieFavorite} from '../models/Movie';

export interface GetFavoriteMovie {
  call: (id: string) => Promise<MovieFavorite | null>;
}

const usecase = async (
  repository: MovieRepository,
  id: string
): Promise<MovieFavorite | null> => {
  try {
    return await repository.getFavorite(id);
  } catch (e) {
    throw e;
  }
};

export const GetFavoriteMovieImpl = (
  repository: MovieRepository,
): GetFavoriteMovie => ({
  call: (id: string) => usecase(repository, id),
});
