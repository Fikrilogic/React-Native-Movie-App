import React from 'react';
import {MovieRepositoryImpl} from '../data/repository/MovieRepository';
import {ApiClientImpl} from '../data/api/ApiClient';
import {
  GetMovieNowPlayingUseCase,
  GetMovieNowPlayingUseCaseImpl,
} from '../domain/usecases/GetMovieNowPlayingUseCase';
import {
  GetMoviePopularUseCase,
  GetMoviePopularUseCaseImpl,
} from '../domain/usecases/GetMoviePopularUseCase';
import {
  GetMovieTopRatedUseCase,
  GetMovieTopRatedUseCaseImpl,
} from '../domain/usecases/GetMovieTopRatedUseCase';
import {
  GetMovieUpcomingUseCase,
  GetMovieUpcomingUseCaseImpl,
} from '../domain/usecases/GetMovieUpcomingUseCase';
import {
  GetMovieSearch,
  GetMovieSearchImpl,
} from '../domain/usecases/GetMovieSearch';
import {
  GetMovieDetail,
  GetMovieDetailImpl,
} from '../domain/usecases/GetMovieDetail';
import {openDatabase} from '../data/local/db';
import {
  AddFavoriteMovie,
  AddFavoriteMovieImpl,
} from '../domain/usecases/AddFavoriteMovie';
import {
  GetFavoriteMovies,
  GetFavoriteMoviesImpl,
} from '../domain/usecases/GetFavoriteMovies';
import {
  GetFavoriteMovie,
  GetFavoriteMovieImpl,
} from '../domain/usecases/GetFavoriteMovie';
import {useMigrations} from 'drizzle-orm/op-sqlite/migrator';
import migrations from '../../drizzle/migrations';

interface ApplicationContextProps {
  getMovieNowPlayingUsecase: GetMovieNowPlayingUseCase;
  getMoviePopularUsecase: GetMoviePopularUseCase;
  getMovieTopRatedUsecase: GetMovieTopRatedUseCase;
  getMovieUpcomingUsecase: GetMovieUpcomingUseCase;
  getMovieSearch: GetMovieSearch;
  getMovieDetail: GetMovieDetail;
  addMovieFavorite: AddFavoriteMovie;
  getFavoritesMovie: GetFavoriteMovies;
  getFavoriteMovie: GetFavoriteMovie;
}

export const ApplicationContext =
  React.createContext<ApplicationContextProps | null>(null);

export const MainApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const db = openDatabase();
  useMigrations(db, migrations);

  const client = ApiClientImpl();
  const movieRepository = MovieRepositoryImpl(client, db);
  const movieNowPlayingUsecase = GetMovieNowPlayingUseCaseImpl(movieRepository);
  const moviePopularUsecase = GetMoviePopularUseCaseImpl(movieRepository);
  const movieTopRatedUsecase = GetMovieTopRatedUseCaseImpl(movieRepository);
  const movieUpcomingUsecase = GetMovieUpcomingUseCaseImpl(movieRepository);
  const movieSearch = GetMovieSearchImpl(movieRepository);
  const movieDetail = GetMovieDetailImpl(movieRepository);
  const addMovieFavorite = AddFavoriteMovieImpl(movieRepository);
  const getFavoritesMovie = GetFavoriteMoviesImpl(movieRepository);
  const getFavoriteMovie = GetFavoriteMovieImpl(movieRepository);
  return (
    <ApplicationContext.Provider
      value={{
        getMovieNowPlayingUsecase: movieNowPlayingUsecase,
        getMoviePopularUsecase: moviePopularUsecase,
        getMovieTopRatedUsecase: movieTopRatedUsecase,
        getMovieUpcomingUsecase: movieUpcomingUsecase,
        getMovieSearch: movieSearch,
        getMovieDetail: movieDetail,
        addMovieFavorite: addMovieFavorite,
        getFavoritesMovie: getFavoritesMovie,
        getFavoriteMovie: getFavoriteMovie,
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = React.useContext(ApplicationContext);
  if (!context)
    throw new Error('useRepositories must be used within RepositoryProvider');
  return context;
};
