import { useCallback } from 'react';

const { default: useDelayFetching } = require('./useDelayFetching');
const { default: useFetching } = require('./useFetching');

const useCombineFetching = (callback) => {
  const {
    executeCallback: fetchCallback,
    isLoading: fetchCallbackLoading,
    error: fetchCallbackError,
  } = useFetching(callback);
  const [
    delayedFetchCallback,
    delayedFetchCallbackLoading,
    delayedFetchCallbackError,
  ] = useDelayFetching(callback, 400);

  const fetch = useCallback(
    (delayed, ...params) => {
      if (delayed) {
        delayedFetchCallback(undefined, ...params);
        return;
      }

      fetchCallback(undefined, ...params);
    },
    [callback]
  );

  return [
    fetch,
    fetchCallbackLoading,
    delayedFetchCallbackLoading,
    fetchCallbackError,
    delayedFetchCallbackError,
  ];
};

export default useCombineFetching;
