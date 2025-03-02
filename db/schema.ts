import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

export const movieFavoriteTable = sqliteTable('Movie', {
  id: text().primaryKey(),
  title: text().default(''),
  poster_path: text().default(''),
  overview: text().default(''),
  is_favorite: integer({mode: 'boolean'}).default(false),
});
