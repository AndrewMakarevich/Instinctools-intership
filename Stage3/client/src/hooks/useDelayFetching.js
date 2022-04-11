import { useCallback, useRef, useState } from 'react';

const useDelayFetching = (callback, delay) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef();

  const executeCallback = useCallback(
    (argumentObj) => {
      try {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
          setIsLoading(true);
          await callback(argumentObj);
          setIsLoading(false);
        }, delay);
      } catch (e) {
        alert(e);
      }
    },
    [callback, delay]
  );

  return [executeCallback, isLoading];
};

export default useDelayFetching;
