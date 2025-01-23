import Loader from '../components/Loader';
import StarRating from '../components/StarRating';
import { useEffect, useState, useRef } from 'react';

export default function MovieDetails({
  API_KEY,
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  const isWatched = watched.some((movie) => movie.imdbID === selectedID);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  function handleAdd() {
    onAddWatched({
      ...movie,
      userRating,
      Runtime: Number(Runtime.split(' ').at(0)),
      countRatingDecisions: countRef.current,
    });
    onCloseMovie();
  }

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedID) {
      getMovieDetails();
    }
  }, [API_KEY, selectedID]);

  useEffect(
    function () {
      document.title = `${Title || 'usePopcorn'}`;

      return function () {
        document.title = 'usePopcorn';
      };
    },
    [Title]
  );

  useEffect(
    function () {
      function handleKeyDown(event) {
        if (event.key === 'Escape') {
          onCloseMovie();
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return function () {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [onCloseMovie]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={Poster} alt={`Poster of ${movie} movie`} />
        <div className='details-overview'>
          <h2>{Title}</h2>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className='rating'>
          {isWatched ? (
            <p>
              <span>You rated this movie {watchedUserRating} 🌟</span>
            </p>
          ) : (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className='btn-add' onClick={handleAdd}>
                  + Add to List
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
}
