import { useCallback, useRef, useState } from 'react';

const useDelayState = (value, delay) => {
  const [state, setState] = useState(value);
  const timeoutRef = useRef();

  const setDelayState = useCallback(
    (newState) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setState(newState), delay);
    },
    [value, delay]
  );

  return [state, setDelayState];
};

export default useDelayState;
