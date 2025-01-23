import { useEffect, useState } from 'react';
import { useMovies } from './hooks/useMovies.js';
import NavBar from './components/NavBar.js';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main.js';
import Box from './components/Box.js';
import MovieList from './components/MovieList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import WatchedSummary from './components/WatchedSummary.js';
import WatchedMoviesList from './components/WatchedMoviesList.js';
import MovieDetails from './components/MovieDetails';
import { API_KEY } from './constants/keys';

export default function App() {
  const [watched, setWatched] = useState(watchedStateCallback);
  const [query, setQuery] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [movies, isLoading, error] = useMovies(query, handleCloseMovie);

  function watchedStateCallback() {
    const watched = localStorage.getItem('watched');
    return watched ? JSON.parse(watched) : [];
  }

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

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search
          query={query}
          setQuery={setQuery}
          onCloseMovie={handleCloseMovie}
        />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedID ? (
            <MovieDetails
              API_KEY={API_KEY}
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
