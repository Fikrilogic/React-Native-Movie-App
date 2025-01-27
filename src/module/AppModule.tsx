import React from 'react';
import {
  MovieRepository,
  MovieRepositoryImpl,
} from '../data/repository/MovieRepository';
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
import { GetMovieSearch, GetMovieSearchImpl } from '../domain/usecases/GetMovieSearch';

interface ApplicationContextProps {
  getMovieNowPlayingUsecase: GetMovieNowPlayingUseCase;
  getMoviePopularUsecase: GetMoviePopularUseCase;
  getMovieTopRatedUsecase: GetMovieTopRatedUseCase;
  getMovieUpcomingUsecase: GetMovieUpcomingUseCase;
  getMovieSearch: GetMovieSearch
}

export const ApplicationContext =
  React.createContext<ApplicationContextProps | null>(null);

export const MainApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = ApiClientImpl();
  const movieRepository = MovieRepositoryImpl(client);
  const movieNowPlayingUsecase = GetMovieNowPlayingUseCaseImpl(movieRepository);
  const moviePopularUsecase = GetMoviePopularUseCaseImpl(movieRepository);
  const movieTopRatedUsecase = GetMovieTopRatedUseCaseImpl(movieRepository);
  const movieUpcomingUsecase = GetMovieUpcomingUseCaseImpl(movieRepository);
  const movieSearch = GetMovieSearchImpl(movieRepository)
  return (
    <ApplicationContext.Provider
      value={{
        getMovieNowPlayingUsecase: movieNowPlayingUsecase,
        getMoviePopularUsecase: moviePopularUsecase,
        getMovieTopRatedUsecase: movieTopRatedUsecase,
        getMovieUpcomingUsecase: movieUpcomingUsecase,
        getMovieSearch: movieSearch
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
