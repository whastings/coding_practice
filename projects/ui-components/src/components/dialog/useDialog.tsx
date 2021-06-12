import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import DialogContainer from './DialogContainer';

interface Result {
  Dialog: React.FunctionComponent;
  openDialog: () => void;
}

function useDialog(contents: React.ReactElement): Result {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const Dialog = () => {
    if (!isOpen) {
      return null;
    }

    return createPortal(
      <DialogContainer>{contents}</DialogContainer>,
      document.body,
    );
  };

  return { Dialog, openDialog };
}

export default useDialog;
