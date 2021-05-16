import React, { useCallback, useContext, useMemo, useRef } from 'react';

export type UniqueID = string;

interface Context {
  getUniqueID: () => UniqueID;
}

interface ProviderProps {
  children: React.ReactNode;
}

const UniqueIDContext = React.createContext<Context | null>(null);

export function UniqueIDContextProvider({ children }: ProviderProps) {
  const nextIDRef = useRef(0);

  const getUniqueID = useCallback(() => {
    const nextID = `unique-id-${nextIDRef.current}`;
    nextIDRef.current += 1;
    return nextID;
  }, []);

  const context = useMemo(() => ({ getUniqueID }), [getUniqueID]);

  return (
    <UniqueIDContext.Provider value={context}>
      {children}
    </UniqueIDContext.Provider>
  );
}

export function useUniqueID(): UniqueID {
  const idRef = useRef<UniqueID | null>(null);
  const uniqueIDContext = useContext(UniqueIDContext);

  if (uniqueIDContext == null) {
    throw new Error('Missing UniqueIDContext!');
  }

  if (idRef.current == null) {
    idRef.current = uniqueIDContext.getUniqueID();
  }

  return idRef.current;
}
