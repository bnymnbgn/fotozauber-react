import { useState, useEffect, useCallback } from 'react';

const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const id = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimeoutId(id);
  }, [callback, delay, timeoutId]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
};

export default useDebounce;