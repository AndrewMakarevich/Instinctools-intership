import { useCallback, useRef, useState } from 'react';

const useDelayFetching = (callback, delay) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef();

  const executeCallback = useCallback(
    (addCallback, ...addArguments) => {
      try {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
          setIsLoading(true);

          if (addCallback && addCallback instanceof Function) {
            await addCallback();
          }

          await callback(...addArguments);
          setIsLoading(false);
        }, delay);
      } catch (e) {
        setIsLoading(false);
        setError(e);
      }
    },
    [callback, delay]
  );

  return [executeCallback, isLoading];
};

export default useDelayFetching;
