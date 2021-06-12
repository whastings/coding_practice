import React, { useState } from 'react';

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

    return <div>{contents}</div>;
  };

  return { Dialog, openDialog };
}

export default useDialog;
