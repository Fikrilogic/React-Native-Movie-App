import {useCallback, useState} from 'react';
import {Movie} from '../domain/models/Movie';
import {GetMovieSearch} from '../domain/usecases/GetMovieSearch';

type Pagination = {
  page: number;
  total_pages: number;
};

export const useSearchController = (getMovieSearch: GetMovieSearch) => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total_pages: 0,
    page: 1,
  });

  const [loading, setLoading] = useState<boolean>();

  const [search, setSearch] = useState<string>('');

  const fetchSubmitMovie = useCallback(async () => {
    if (search.trim() === '') return;
    setLoading(true);
    const res = await getMovieSearch.call({
      page: 1,
      query: search,
    });
    setMovie(res.results);
    setPagination({total_pages: res.total_pages, page: res.page});
    setLoading(false);
  }, [search]);

  const fetchPaginationMovie = useCallback(async () => {
    if (pagination.page > pagination.total_pages) return;
    setLoading(true);
    const res = await getMovieSearch.call({
        page: pagination.page,
        query: search,
    });
    setMovie((prev) => [...prev, ...res.results]);
    setPagination(prev => ({total_pages: res.total_pages, page: prev.page}));
    setLoading(false);
  }, [pagination.page, pagination.total_pages]);

  const onChangeSearch = (value: string) => {
    setSearch(value.trim());
  };

  return {
    pagination,
    movie,
    loading,
    onChangeSearch,
    fetchSubmitMovie,
    fetchPaginationMovie,
    search,
    setPagination
  };
};
