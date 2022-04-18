import { useCallback, useState } from 'react';

const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeCallback = useCallback(
    async (additionalCallback, ...restArgs) => {
      console.log(restArgs);
      try {
        setIsLoading(true);

        if (additionalCallback && additionalCallback instanceof Function) {
          await additionalCallback();
        }

        await callback(...restArgs);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(e);
      }
    },
    [callback]
  );

  return { executeCallback, isLoading, error };
};

export default useFetching;
