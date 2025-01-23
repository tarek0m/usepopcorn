import { useEffect, useState } from 'react';
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
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
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

  useEffect(
    function () {
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

      handleCloseMovie();
      getMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
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
