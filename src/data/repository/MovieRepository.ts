
import {MovieResponse} from '../../domain/models/Movie';
import {ApiClient} from '../api/ApiClient';


const getMovieNowPlaying = (client: ApiClient, endpoint: string): Promise<MovieResponse> => {
  return client.Get<MovieResponse>(endpoint);
};

export interface MovieRepository {
  getNowPlaying: () => Promise<MovieResponse>,
  getPopular: () => Promise<MovieResponse>,
  getTopRated: () => Promise<MovieResponse>,
  getUpcoming: () => Promise<MovieResponse>,
}

export const MovieRepositoryImpl = (client :ApiClient): MovieRepository => ({
  getNowPlaying: () => getMovieNowPlaying(client, 'movie/now_playing'),
  getPopular: () => getMovieNowPlaying(client, 'movie/popular'),
  getTopRated: () => getMovieNowPlaying(client, 'movie/top_rated'),
  getUpcoming: () => getMovieNowPlaying(client, 'movie/upcoming'),
});

