import { useContext, useEffect, useRef } from 'react';

import KeyboardEventsContext, { EventConfig } from './KeyboardEventsContext';

function useKeyboardEvent(config: EventConfig): void {
  const context = useContext(KeyboardEventsContext);
  if (context == null) {
    throw new Error('Missing KeyboardEventsProvider!');
  }

  const configRef = useRef<EventConfig>({ ...config });
  configRef.current.callback = config.callback;
  configRef.current.key = config.key;

  const isRegisteredRef = useRef(false);
  useEffect(() => {
    const currentConfig = configRef.current;

    if (!isRegisteredRef.current) {
      context.addEventConfig(currentConfig);
      isRegisteredRef.current = true;
    }

    return () => {
      context.removeEventConfig(currentConfig);
      isRegisteredRef.current = false;
    };
  }, [context]);
}

export default useKeyboardEvent;
