import WatchedMovie from './WatchedMovie';

export default function WatchedMoviesList({
  watched,
  onSelectMovie,
  onDeleteWatched,
}) {
  return (
    <ul className='list list-movies'>
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
