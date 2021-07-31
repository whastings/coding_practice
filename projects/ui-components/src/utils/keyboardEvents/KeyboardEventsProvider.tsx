import React, { useCallback, useMemo, useRef } from 'react';

import KeyboardEventsContext, { EventConfig } from './KeyboardEventsContext';

interface Props {
  children: React.ReactChild;
}

function KeyboardEventsProvider({ children }: Props) {
  const eventConfigsRef = useRef<EventConfig[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addEventConfig = useCallback((config: EventConfig) => {
    eventConfigsRef.current.push(config);
  }, []);

  const removeEventConfig = useCallback((configToRemove: EventConfig) => {
    eventConfigsRef.current = eventConfigsRef.current.filter(
      (config) => config !== configToRemove,
    );
  }, []);

  const contextValue = useMemo(() => ({ addEventConfig, removeEventConfig }), [
    addEventConfig,
    removeEventConfig,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    const containerElement = containerRef.current;
    if (containerElement == null) {
      throw new Error('Missing container ref!');
    }

    eventConfigsRef.current.forEach((config) => {
      if (config.key === key) {
        config.callback(event, containerElement);
      }
    });
  };

  return (
    <KeyboardEventsContext.Provider value={contextValue}>
      <div onKeyDown={handleKeyDown} ref={containerRef}>
        {children}
      </div>
    </KeyboardEventsContext.Provider>
  );
}

export default KeyboardEventsProvider;
