import {
  ANDROID_DATABASE_PATH,
  DB,
  IOS_LIBRARY_PATH,
  open,
} from '@op-engineering/op-sqlite';
import {Platform} from 'react-native';

export const key = 'testkey';

export const MOVIE_TABLE_NAME = 'Movie';

export const openDatabase = (): DB => {
  return open({
    name: 'movieApp.sqlite',
    encryptionKey: key,
    location: Platform.OS === 'ios' ? IOS_LIBRARY_PATH : ANDROID_DATABASE_PATH,
  });
};

export const createTableMovie = async (db: DB) => {
  // await db.execute(
  //   `DROP TABLE ${MOVIE_TABLE_NAME}`
  // )

  await db.execute(
    `CREATE TABLE ${MOVIE_TABLE_NAME} (` +
      'Id varchar(50) NOT NULL UNIQUE,' +
      'Title varchar(100),' +
      'PosterPath varchar,' +
      'Overview varchar,' +
      'IsFavorite boolean)'
  );
};
