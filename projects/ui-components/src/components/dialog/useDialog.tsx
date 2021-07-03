import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import DialogContainer from './DialogContainer';

interface Options {
  title: string;
}

interface Result {
  Dialog: React.FunctionComponent;
  openDialog: () => void;
  triggerRef: React.RefCallback<HTMLElement>;
}

function useDialog(contents: React.ReactElement, options: Options): Result {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    if (triggerRef.current != null) {
      triggerRef.current.focus();
    }
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

  return {
    Dialog,
    openDialog,
    triggerRef: (el) => {
      triggerRef.current = el;
    },
  };
}

export default useDialog;
