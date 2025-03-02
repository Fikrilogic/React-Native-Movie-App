import {Movie, MovieFavorite, MovieResponse} from '../../domain/models/Movie';
import {ApiClient} from '../api/ApiClient';
import {OPSQLiteDatabase} from 'drizzle-orm/op-sqlite';
import {movieFavoriteTable} from '../../../db/schema';
import {eq} from 'drizzle-orm';

const getMovie = (
  client: ApiClient,
  endpoint: string,
): Promise<MovieResponse> => {
  try {
    return client.Get<MovieResponse>(endpoint);
  } catch (e) {
    throw e;
  }
};

const getMovieDetail = (
  client: ApiClient,
  endpoint: string,
): Promise<Movie> => {
  return client.Get<Movie>(endpoint);
};

const getMoviesFavorite = async (
  db: OPSQLiteDatabase | null,
): Promise<MovieFavorite[]> => {
  if (!db) return [];
  try {
    const movie: MovieFavorite[] = await db
      .select()
      .from(movieFavoriteTable)
      .where(eq(movieFavoriteTable.is_favorite, true));
    return movie;
  } catch (e) {
    return [];
  }
};

const getMovieFavorite = async (
  db: OPSQLiteDatabase | null,
  id: string,
): Promise<MovieFavorite | null> => {
  if (!db) return null;
  try {
    const movie: MovieFavorite[] = await db
      .select()
      .from(movieFavoriteTable)
      .where(eq(movieFavoriteTable.id, id));
    return movie[0];
  } catch (e) {
    return null;
  }
};

const addFavoriteMovie = async (
  db: OPSQLiteDatabase | null,
  movie: Movie,
): Promise<void> => {
  if (!db) return;
  try {
    await db.insert(movieFavoriteTable).values({
      id: movie.id ?? '0',
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      is_favorite: true,
    });
    return;
  } catch (e) {
    throw e;
  }
};

const updateFavoriteMovie = async (
  db: OPSQLiteDatabase | null,
  movie: Movie,
  isFavorite: boolean,
): Promise<void> => {
  if (!db) return;
  try {
    await db
      .update(movieFavoriteTable)
      .set({is_favorite: isFavorite})
      .where(eq(movieFavoriteTable.id, movie.id ?? '0'));
    return;
  } catch (e) {
    throw e;
  }
};

export interface MovieRepository {
  getNowPlaying: () => Promise<MovieResponse>;
  getPopular: () => Promise<MovieResponse>;
  getTopRated: () => Promise<MovieResponse>;
  getUpcoming: () => Promise<MovieResponse>;
  search: (query: string, page: number) => Promise<MovieResponse>;
  detail: (id: string) => Promise<Movie>;
  getFavorites: () => Promise<MovieFavorite[]>;
  getFavorite: (id: string) => Promise<MovieFavorite | null>;
  addFavorite: (movie: Movie) => Promise<void>;
  updateFavorite: (movie: Movie, isFavorite: boolean) => Promise<void>;
}

export const MovieRepositoryImpl = (
  client: ApiClient,
  db: OPSQLiteDatabase | null,
): MovieRepository => ({
  getNowPlaying: () => getMovie(client, 'movie/now_playing'),
  getPopular: () => getMovie(client, 'movie/popular'),
  getTopRated: () => getMovie(client, 'movie/top_rated'),
  getUpcoming: () => getMovie(client, 'movie/upcoming'),
  search: (query: string, page: number) =>
    getMovie(
      client,
      `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    ),
  detail: (id: string) => getMovieDetail(client, `movie/${id}&language=en-US`),
  getFavorites: () => getMoviesFavorite(db),
  getFavorite: (id: string) => getMovieFavorite(db, id),
  addFavorite: (movie: Movie) => addFavoriteMovie(db, movie),
  updateFavorite: (movie: Movie, isFavorite: boolean) =>
    updateFavoriteMovie(db, movie, isFavorite),
});
