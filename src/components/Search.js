import { useEffect, useRef } from 'react';
import { useKey } from '../hooks/useKey';

export default function Search({ query, setQuery, onCloseMovie }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useKey('Enter', function () {
    if (document.activeElement === inputRef.current) {
      return;
    }
    inputRef.current.focus();
    setQuery('');
    onCloseMovie();
  });

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
