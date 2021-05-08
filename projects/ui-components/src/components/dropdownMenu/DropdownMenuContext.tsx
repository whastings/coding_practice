import React, { useContext, useMemo } from 'react';

interface Context {
  onItemActivate: () => void;
}

interface ProviderProps extends Context {
  children: React.ReactNode;
}

const DropdownMenuContext = React.createContext<Context | null>(null);

export function DropdownMenuContextProvider({
  children,
  onItemActivate,
}: ProviderProps) {
  const context = useMemo(() => ({ onItemActivate }), [onItemActivate]);
  return (
    <DropdownMenuContext.Provider value={context}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function useDropdownMenuContext(): Context {
  const context = useContext<Context | null>(DropdownMenuContext);

  if (context == null) {
    throw new Error('Missing DropdownMenuContext!');
  }

  return context;
}
