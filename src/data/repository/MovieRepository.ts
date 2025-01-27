import {MovieResponse} from '../../domain/models/Movie';
import {ApiClient} from '../api/ApiClient';

const getMovie = (
  client: ApiClient,
  endpoint: string,
): Promise<MovieResponse> => {
  return client.Get<MovieResponse>(endpoint);
};

export interface MovieRepository {
  getNowPlaying: () => Promise<MovieResponse>;
  getPopular: () => Promise<MovieResponse>;
  getTopRated: () => Promise<MovieResponse>;
  getUpcoming: () => Promise<MovieResponse>;
  search: (query: string, page: number) => Promise<MovieResponse>;
}

export const MovieRepositoryImpl = (client: ApiClient): MovieRepository => ({
  getNowPlaying: () => getMovie(client, 'movie/now_playing'),
  getPopular: () => getMovie(client, 'movie/popular'),
  getTopRated: () => getMovie(client, 'movie/top_rated'),
  getUpcoming: () => getMovie(client, 'movie/upcoming'),
  search: (query: string, page: number) =>
    getMovie(
      client,
      `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    ),
});
