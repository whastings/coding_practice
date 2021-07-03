import React, { useContext, useRef } from 'react';

import DialogContext, { DialogConfigFn } from './DialogContext';

interface Result {
  openDialog: DialogConfigFn;
  triggerRef: React.RefCallback<HTMLElement>;
}

function useDialog(): Result {
  const dialogContext = useContext(DialogContext);
  const triggerRef = useRef<HTMLElement | null>(null);

  if (dialogContext == null) {
    throw new Error('No dialog context available!');
  }

  const openDialog: DialogConfigFn = (config) => {
    const { renderDialog } = dialogContext;
    renderDialog({
      ...config,
      onClose() {
        if (triggerRef.current != null) {
          triggerRef.current.focus();
        }
        if (config.onClose != null) {
          config.onClose();
        }
      },
    });
  };

  return {
    openDialog,
    triggerRef: (el) => {
      triggerRef.current = el;
    },
  };
}

export default useDialog;
