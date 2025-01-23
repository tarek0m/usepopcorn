import { useEffect } from 'react';

export function useKey(key, callback) {
  useEffect(
    function () {
      function handleKeyDown(event) {
        if (event.key === key) {
          callback();
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return function () {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [callback, key]
  );
}
