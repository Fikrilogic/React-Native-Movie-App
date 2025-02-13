import {Constants} from '../../commons';
import {MovieRepository} from '../../data/repository/MovieRepository';
import {Movie} from '../models/Movie';

export interface GetMovieDetail {
  call: (id: string) => Promise<Movie>;
}

const usecase = async (
  repository: MovieRepository,
  id: string,
): Promise<Movie> => {
  const movie = await repository.detail(id);
  movie.poster_path = `${Constants.imgUrl}${movie.poster_path}`;
  movie.backdrop_path = `${Constants.imgUrl}${movie.backdrop_path}`;
  return movie;
};

export const GetMovieDetailImpl = (
  repository: MovieRepository,
): GetMovieDetail => ({
  call: (id: string) => usecase(repository, id),
});
