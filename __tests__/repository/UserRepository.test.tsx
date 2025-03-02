import {
  MovieRepository,
  MovieRepositoryImpl,
} from '../../src/data/repository/MovieRepository';
import {ApiClient, ApiClientImpl} from '../../src/data/api/ApiClient';
import {Movie, MovieResponse} from '../../src/domain/models/Movie';

jest.mock('../../src/data/api/ApiClient', () => {
  return {
    ApiClientImpl: jest.fn().mockImplementation(
      (): ApiClient => ({
        Get: jest.fn(),
        Post: jest.fn(),
        Update: jest.fn(),
        Delete: jest.fn(),
      }),
    ),
  };
});

// jest.mock('@op-engineering/op-sqlite', () => {
//   return {
//     open: jest.fn(
//       (params: {name: string}): DB => ({
//         close: jest.fn(),
//         delete: jest.fn(),
//         attach: jest.fn(),
//         detach: jest.fn(),
//         transaction: jest.fn(),
//         executeSync: jest.fn(),
//         execute: jest.fn(),
//         executeWithHostObjects: jest.fn(),
//         executeBatch: jest.fn(),
//         loadFile: jest.fn(),
//         updateHook: jest.fn(),
//         commitHook: jest.fn(),
//         rollbackHook: jest.fn(),
//         prepareStatement: jest.fn(),
//         loadExtension: jest.fn(),
//         executeRaw: jest.fn(),
//         getDbPath: jest.fn(),
//         reactiveExecute: jest.fn(),
//         sync: jest.fn(),
//       }),
//     ),
//   };
// });

describe('MovieRepository', () => {
  let apiClientMock: jest.Mocked<ApiClient>;
  let repository: MovieRepository;
  const mockMoviePopular = new MovieResponse(
    [
      new Movie({
        title: 'test title',
        backdrop_path: 'image',
        popularity: 10,
        poster_path: 'poster image',
        overview: 'this is overview',
      }),
      new Movie({
        title: 'test title',
        backdrop_path: 'image',
        popularity: 10,
        poster_path: 'poster image',
        overview: 'this is overview',
      }),
      new Movie({
        title: 'test title',
        backdrop_path: 'image',
        popularity: 10,
        poster_path: 'poster image',
        overview: 'this is overview',
      }),
      new Movie({
        title: 'test title',
        backdrop_path: 'image',
        popularity: 10,
        poster_path: 'poster image',
        overview: 'this is overview',
      }),
      new Movie({
        title: 'test title',
        backdrop_path: 'image',
        popularity: 10,
        poster_path: 'poster image',
        overview: 'this is overview',
      }),
    ],
    10,
    1,
    1,
  );

  // const mockMovieFavorites: MovieFavorite[] =  [
  //   new MovieFavorite({
  //     id: 1,
  //     title: 'movie test favorite',
  //     poster_path: 'img url',
  //     overview: 'test movie overview',
  //     is_favorite: true
  //   })
  // ]

  beforeEach(() => {
    apiClientMock = ApiClientImpl() as jest.Mocked<ApiClient>;
    repository = MovieRepositoryImpl(apiClientMock, null);
  });

  it('must get movie', async () => {
    apiClientMock.Get.mockResolvedValue(mockMoviePopular);

    const res = await repository.getPopular();
    expect(res).toEqual(mockMoviePopular);
  });

  it('must get error get movie', async () => {
    apiClientMock.Get.mockRejectedValue(new Error('movie'));
    await expect(repository.getPopular()).rejects.toThrow('movie');
  });

  // it('must get movie popular', async () => {
    // db.execute.mockResolvedValue(mockMovieFavorites)
  // })
});
