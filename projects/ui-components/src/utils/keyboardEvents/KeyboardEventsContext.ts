import React from 'react';

export interface EventConfig {
  callback: (
    event: React.KeyboardEvent<HTMLElement>,
    container: HTMLDivElement,
  ) => void;
  key: string;
}

interface Context {
  addEventConfig: (config: EventConfig) => void;
  removeEventConfig: (config: EventConfig) => void;
}

const KeyboardEventsContext = React.createContext<Context | null>(null);

export default KeyboardEventsContext;
