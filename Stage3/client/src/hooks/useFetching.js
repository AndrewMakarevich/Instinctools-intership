import { useCallback, useState } from 'react';

const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeCallback = useCallback(
    async (additionalCallback, ...restArgs) => {
      try {
        setIsLoading(true);

        if (additionalCallback && additionalCallback instanceof Function) {
          await additionalCallback();
        }

        await callback(...restArgs);
      } catch (e) {
        setError(e);
        if (e.isAxiosError) {
          throw Error(e.response.data.message);
        } else {
          throw Error(e);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [callback]
  );

  return { executeCallback, isLoading, error };
};

export default useFetching;
