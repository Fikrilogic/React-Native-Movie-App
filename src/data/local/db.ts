import {
  ANDROID_DATABASE_PATH,
  IOS_LIBRARY_PATH,
  open,
} from '@op-engineering/op-sqlite';
import {drizzle, OPSQLiteDatabase} from 'drizzle-orm/op-sqlite';
import {Platform} from 'react-native';

export const key = 'testkey';

export const MOVIE_TABLE_NAME = 'Movie';

export const openDatabase = (): OPSQLiteDatabase => {
  const opDb = open({
    name: 'moviedb',
    encryptionKey: key,
    location: Platform.OS === 'ios' ? IOS_LIBRARY_PATH : ANDROID_DATABASE_PATH,
  });
  return drizzle(opDb);
};
