import { useRef, useState } from "react"

const useDelayFetching = (callback, delay) => {
  const [isLoading, setIsLoading] = useState(false);
  let timeout;
  const timeoutRef = useRef(timeout);

  const executeCallback = async () => {
    try {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        async () => {
          setIsLoading(true);
          await callback();
          setIsLoading(false);
        }, delay);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  }

  return [executeCallback, isLoading];
}

export default useDelayFetching;