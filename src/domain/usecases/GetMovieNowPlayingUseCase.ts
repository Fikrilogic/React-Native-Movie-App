import {MovieRepository} from '../../data/repository/MovieRepository';
import {MovieResponse} from '../models/Movie';

export interface GetMovieNowPlayingUseCase {
  call: () => Promise<MovieResponse>;
}

const usecase = async (repository: MovieRepository): Promise<MovieResponse> => {
  const movies = await repository.getNowPlaying();
  console.log(`usecase: ${movies.results.length}`);
  movies.results = movies.results.slice(0, 8);
  return movies;
};

export const GetMovieNowPlayingUseCaseImpl = (
  repository: MovieRepository,
): GetMovieNowPlayingUseCase => ({
  call: () => usecase(repository),
});
