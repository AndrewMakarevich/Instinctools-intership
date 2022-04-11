import { useCallback, useRef, useState } from 'react';

const useDelayFetching = (callback, delay) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef();

  const executeCallback = useCallback(
    (addCallback, ...addArguments) => {
      try {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
          setIsLoading(true);

          if (addCallback && addCallback instanceof Function) {
            addCallback();
          }

          await callback(...addArguments);
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
