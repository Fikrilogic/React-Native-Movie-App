class Movie {
  original_title?: string;
  poster_path?: string;
  backdrop_path?: string;
  id?: string;
  original_language?: string;
  popularity?: number;
  title?: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  tagline?: string;
  release_date?: string;
  status?: string;
  genres?: Genre[];
  runtime?: number;
  spoken_languages?: MovieSpokenLanguage[];
  production_companies?: Company[];

  constructor({
    original_title,
    poster_path,
    backdrop_path,
    id,
    original_language,
    popularity,
    title,
    vote_average,
    vote_count,
    overview,
    release_date,
    genres,
    runtime,
    spoken_languages,
    production_companies,
    tagline,
    status,
  }: {
    original_title?: string;
    poster_path?: string;
    backdrop_path?: string;
    id?: string;
    original_language?: string;
    popularity?: number;
    title?: string;
    vote_average?: number;
    vote_count?: number;
    overview?: string;
    release_date?: string;
    genres?: Genre[];
    runtime?: number;
    spoken_languages?: MovieSpokenLanguage[];
    production_companies?: Company[];
    tagline?: string;
    status?: string;
  }) {
    this.original_title = original_title;
    this.poster_path = poster_path;
    this.backdrop_path = backdrop_path;
    this.id = id;
    this.original_language = original_language;
    this.popularity = popularity;
    this.title = title;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.overview = overview;
    this.release_date = release_date;
    this.genres = genres;
    this.runtime = runtime;
    this.spoken_languages = spoken_languages;
    this.production_companies = production_companies;
    this.status = status;
    this.tagline = tagline;
  }
}

class Genre {
  id?: string;
  name?: string;

  constructor({id, name}: {id?: string; name?: string}) {
    this.id = id;
    this.name = name;
  }
}

class Company {
  id?: string;
  name?: string;
  origin_country?: string;
}

class MovieSpokenLanguage {
  english_name?: string;
  name?: string;

  constructor({english_name, name}: {english_name?: string; name?: string}) {
    this.english_name = english_name;
    this.name = name;
  }
}

type MovieFavorite = {
  id: string;
  title: string | null;
  poster_path: string | null;
  overview: string | null;
  is_favorite: boolean | null;
};

class MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;

  constructor(
    results: Movie[],
    page: number,
    total_pages: number,
    total_results: number,
  ) {
    this.results = results;
    this.page = page;
    this.total_pages = total_pages;
    this.total_results = total_results;
  }
}

export {Movie, MovieResponse};
export type {MovieFavorite};
