import { useEffect, useRef, useState } from 'react';

export const useListener = (event, handler) => {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
};

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useListener('mousemove', e => {
    setPosition({ x: e.clientX - window.innerWidth / 2, y: -e.clientY + window.innerHeight / 2 });
  });

  useListener('click', () => {
    console.log('Clicked the window!');
  });

  return position;
};

export const usePrevious = value => {
  const ref = useRef(value);

  useEffect(() => {
    console.log('Running Effect');
    ref.current = value;
  }, [value]);

  console.log('Returning Current');
  return ref.current;
};

export const usePersistedState = (storageKey, fallbackValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue === null || !storedValue) {
      console.log('returning fallback', fallbackValue);
      return fallbackValue;
    }

    try {
      console.log('storedValue', storedValue);
      return JSON.parse(storedValue);
    } catch (e) {
      console.log('Error parsing stored value', e);
      return null;
    }
  });

  useEffect(() => {
    if (value) {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey, value]);

  return [
    value,
    setValue,
    () => {
      setValue(fallbackValue);
    },
  ];
};

export const useUrlState = ({ key, initialValue }) => {
  const getJsonFromHash = () => {
    if (!window.location.hash) return {};

    const hashState = atob(window.location.hash.slice(1));
    try {
      return JSON.parse(hashState);
    } catch (e) {}
    return {};
  };

  const [value, setValue] = useState(() => initialValue ?? getJsonFromHash()[key]);

  useEffect(() => {
    const newState = {
      ...getJsonFromHash(),
      [key]: value,
    };

    const hashed = btoa(JSON.stringify(newState));
    window.location.hash = `#${hashed}`;
  }, [value, key]);

  return [value, setValue];
};
