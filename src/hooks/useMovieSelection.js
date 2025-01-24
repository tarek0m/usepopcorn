import { useState } from 'react';
import { useLocalStorageState } from './useLocalStorageState';

export function useMovieSelection() {
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const [selectedID, setSelectedID] = useState('');

  function handleSelectMovie(id) {
    setSelectedID(selectedID === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched([...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  return [
    watched,
    selectedID,
    handleSelectMovie,
    handleCloseMovie,
    handleAddWatched,
    handleDeleteWatched,
  ];
}
