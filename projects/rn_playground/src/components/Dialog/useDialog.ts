import React, { useContext } from 'react';

import DialogContext from './DialogContext';

function useDialog(component: React.ComponentType) {
  const dialogContext = useContext(DialogContext);

  if (dialogContext == null) {
    throw new Error('Missing DialogContext');
  }

  return () => {
    dialogContext.renderDialog(component);
  };
}

export default useDialog;
