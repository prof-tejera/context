import { useEffect, useRef, useState } from 'react';

export const usePrevious = value => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const usePersistedState = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Read initial value from local storage or fallback to the given initial value
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
