import {DB} from '@op-engineering/op-sqlite';
import {Movie, MovieFavorite, MovieResponse} from '../../domain/models/Movie';
import {ApiClient} from '../api/ApiClient';
import {MOVIE_TABLE_NAME} from '../local/db';

const getMovie = (
  client: ApiClient,
  endpoint: string,
): Promise<MovieResponse> => {
  return client.Get<MovieResponse>(endpoint);
};

const getMovieDetail = (
  client: ApiClient,
  endpoint: string,
): Promise<Movie> => {
  return client.Get<Movie>(endpoint);
};

const getMoviesFavorite = async (db: DB): Promise<MovieFavorite[]> => {
  try {
    let {rows} = await db.execute(
      `SELECT * FROM ${MOVIE_TABLE_NAME} WHERE IsFavorite = ?;`,
      [1],
    );
    const listMovie: MovieFavorite[] = [];
    rows.forEach(data => {
      listMovie.push(new MovieFavorite(data));
    });

    return listMovie;
  } catch (e) {
    return [];
  }
};

const getMovieFavorite = async (
  db: DB,
  id: string,
): Promise<MovieFavorite | null> => {
  try {
    let {rows} = await db.execute(
      `SELECT * FROM ${MOVIE_TABLE_NAME} WHERE Id = ?;`,
      [id],
    );

    let movie: MovieFavorite = new MovieFavorite(rows[0]);
    return movie;
  } catch (e) {
    return null;
  }
};

const addFavoriteMovie = async (db: DB, movie: Movie): Promise<void> => {
  try {
    const res = await db.execute(
      `INSERT INTO ${MOVIE_TABLE_NAME} VALUES (?,?,?,?,?);`,
      [
        movie.id ?? '0',
        movie.title ?? '',
        movie.poster_path ?? '',
        movie.overview ?? '',
        true,
      ],
    );
    return;
  } catch (e) {
    throw e;
  }
};

const updateFavoriteMovie = async (
  db: DB,
  movie: Movie,
  isFavorite: boolean,
): Promise<void> => {
  try {
    const res = await db.execute(
      `UPDATE ${MOVIE_TABLE_NAME} SET IsFavorite = ? WHERE Id = ?;`,
      [isFavorite, movie.id ?? '0'],
    );
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
  db: DB,
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
