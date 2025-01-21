import { useState } from 'react';
import { tempMovieData } from './movieData.js';
import NavBar from './components/NavBar.js';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main.js';
import Box from './components/Box.js';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary.js';
import WatchedMoviesList from './components/WatchedMoviesList.js';
import { tempWatchedData } from './movieData.js';

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
