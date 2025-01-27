export default function NumResults({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className='num-results'>No results found</p>;
  }

  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
