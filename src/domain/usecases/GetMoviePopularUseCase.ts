import { Constants } from '../../commons';
import {MovieRepository} from '../../data/repository/MovieRepository';
import {Movie, MovieResponse} from '../models/Movie';

export interface GetMoviePopularUseCase {
  call: () => Promise<MovieResponse>;
}

const usecase = async (repository: MovieRepository): Promise<MovieResponse> => {
  const movies = await repository.getPopular();
  movies.results = movies.results.slice(0, 8).map((movie: Movie) => {
    const newMovie = movie
    newMovie.poster_path = `${Constants.imgUrl}${movie.poster_path}`
    return newMovie
  });
  return movies;
};

export const GetMoviePopularUseCaseImpl = (
  repository: MovieRepository,
): GetMoviePopularUseCase => ({
  call: () => usecase(repository),
});
