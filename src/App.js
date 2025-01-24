import { useState } from 'react';
import { useMovies } from './hooks/useMovies.js';
import { useMovieSelection } from './hooks/useMovieSelection';
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
  const [query, setQuery] = useState('');
  const [
    watched,
    selectedID,
    handleSelectMovie,
    handleCloseMovie,
    handleAddWatched,
    handleDeleteWatched,
  ] = useMovieSelection();
  const [movies, isLoading, error] = useMovies(query, handleCloseMovie);

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
                onSelectMovie={handleSelectMovie}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
