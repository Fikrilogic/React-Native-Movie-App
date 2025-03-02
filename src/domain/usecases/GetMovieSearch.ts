import {Constants} from '../../commons';
import {MovieRepository} from '../../data/repository/MovieRepository';
import {Movie, MovieResponse} from '../models/Movie';

export interface GetMovieSearch {
  call: (request: SearchRequest) => Promise<MovieResponse>;
}

export type SearchRequest = {
  query: string;
  page: number;
};

const usecase = async (
  repository: MovieRepository,
  request: SearchRequest,
): Promise<MovieResponse> => {
  const movies = await repository.search(request.query, request.page);
  movies.results = movies.results.map((movie: Movie) => {
    const newMovie = movie;
    newMovie.poster_path = `${Constants.imgUrl}${movie.poster_path}`;
    return newMovie;
  });
  return movies;
};

export const GetMovieSearchImpl = (
  repository: MovieRepository,
): GetMovieSearch => ({
  call: (request: SearchRequest) => usecase(repository, request),
});
