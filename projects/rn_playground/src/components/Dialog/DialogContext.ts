import React from 'react';

export interface ContextType {
  renderDialog: (component: React.ComponentType) => void;
}

const DialogContext = React.createContext<ContextType | null>(null);

export default DialogContext;
