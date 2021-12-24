import { useRef } from 'react';

function useCallbackRef<T extends Function>(
  callback: T,
): React.MutableRefObject<T> {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return callbackRef;
}

export default useCallbackRef;
