import { useEffect, useRef } from 'react';

export default function Search({ query, setQuery, onCloseMovie }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(
    function () {
      function handleKeyDown(event) {
        if (document.activeElement === inputRef.current) {
          return;
        }

        if (event.key === 'Enter') {
          inputRef.current.focus();
          setQuery('');
          onCloseMovie();
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return function () {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [onCloseMovie, setQuery]
  );

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
}
