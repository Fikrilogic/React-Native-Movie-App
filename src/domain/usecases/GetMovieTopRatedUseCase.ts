import { Constants } from '../../commons';
import {MovieRepository} from '../../data/repository/MovieRepository';
import {Movie, MovieResponse} from '../models/Movie';

export interface GetMovieTopRatedUseCase {
  call: () => Promise<MovieResponse>;
}

const usecase = async (repository: MovieRepository): Promise<MovieResponse> => {
  const movies = await repository.getTopRated();
  movies.results = movies.results.slice(0, 8).map((movie: Movie) => {
    const newMovie = movie
    newMovie.poster_path = `${Constants.imgUrl}${movie.poster_path}`
    return newMovie
  });
  return movies;
};

export const GetMovieTopRatedUseCaseImpl = (
  repository: MovieRepository,
): GetMovieTopRatedUseCase => ({
  call: () => usecase(repository),
});
