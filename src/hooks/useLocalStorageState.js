import { useState, useEffect } from 'react';

export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(valueStateCallback);

  function valueStateCallback() {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  }
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
