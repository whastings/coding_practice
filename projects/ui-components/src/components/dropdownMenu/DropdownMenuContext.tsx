import React, { useContext, useMemo } from 'react';

import { UniqueID } from '../../utils/uniqueID/UniqueIDContext';

interface Context {
  onItemActivate: () => void;
  menuID: UniqueID;
  triggerID: UniqueID;
}

interface ProviderProps extends Context {
  children: React.ReactNode;
}

const DropdownMenuContext = React.createContext<Context | null>(null);

export function DropdownMenuContextProvider({
  children,
  menuID,
  onItemActivate,
  triggerID,
}: ProviderProps) {
  const context = useMemo(() => ({ menuID, onItemActivate, triggerID }), [
    menuID,
    onItemActivate,
    triggerID,
  ]);
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
