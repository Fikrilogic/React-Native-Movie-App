class Movie {
  original_title?: string;
  poster_path?: string;
  id?: string;
  original_language?: string;
  popularity?: number;
  title?: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  release_date?: string;

  // constructor(
  //   original_title?: string,
  //   poster_path?: string,
  //   id?: string,
  //   original_language?: string,
  //   popularity?: number,
  //   title?: string,
  //   vote_average?: number,
  //   vote_count?: number,
  //   overview?: string,
  //   release_date?: string,
  // ) {
  //   this.original_title = original_title;
  //   this.poster_path = poster_path;
  //   this.id = id;
  //   this.original_language = original_language;
  //   this.popularity = popularity;
  //   this.title = title;
  //   this.vote_average = vote_average;
  //   this.vote_count = vote_count;
  //   this.overview = overview;
  //   this.release_date = release_date;
  // }

  constructor({
    original_title,
    poster_path,
    id,
    original_language,
    popularity,
    title,
    vote_average,
    vote_count,
    overview,
    release_date,
  }: {
    original_title?: string;
    poster_path?: string;
    id?: string;
    original_language?: string;
    popularity?: number;
    title?: string;
    vote_average?: number;
    vote_count?: number;
    overview?: string;
    release_date?: string;
  }) {
    this.original_title = original_title;
    this.poster_path = poster_path;
    this.id = id;
    this.original_language = original_language;
    this.popularity = popularity;
    this.title = title;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.overview = overview;
    this.release_date = release_date;
  }
}

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
