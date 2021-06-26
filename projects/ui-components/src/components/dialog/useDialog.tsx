import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import DialogContainer from './DialogContainer';

interface Options {
  title: string;
}

interface Result {
  Dialog: React.FunctionComponent;
  openDialog: () => void;
}

function useDialog(contents: React.ReactElement, options: Options): Result {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const Dialog = () => {
    if (!isOpen) {
      return null;
    }

    return createPortal(
      <DialogContainer onCloseClick={closeDialog} title={options.title}>
        {contents}
      </DialogContainer>,
      document.body,
    );
  };

  return { Dialog, openDialog };
}

export default useDialog;
