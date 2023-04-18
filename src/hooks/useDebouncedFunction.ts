import { useCallback, useRef } from 'react';

function useDebouncedFunction<T>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const debouncedFunction = useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        // @ts-ignore
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFunction as T;
}

export default useDebouncedFunction;
