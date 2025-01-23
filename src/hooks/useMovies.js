import { useState, useEffect } from 'react';
import { API_KEY } from '../constants/keys';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();
      const signal = controller.signal;
      async function getMovies() {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal }
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.Response === 'False') {
            throw new Error(data.Error);
          }
          setMovies(data.Search);
          setError(null);
        } catch (err) {
          if (err.name !== 'AbortError') {
            setMovies([]);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      getMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return [movies, isLoading, error];
}
