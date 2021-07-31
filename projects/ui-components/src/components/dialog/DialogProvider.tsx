import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import DialogContext, { AbstractDialogConfig } from './DialogContext';
import DialogContainer from './DialogContainer';
import styles from './DialogProvider.module.css';

interface Props {
  children: React.ReactChild;
}

function DialogProvider({ children }: Props) {
  const [renderedDialogs, setRenderedDialogs] = useState<
    AbstractDialogConfig[]
  >([]);

  const removeDialog = (configToRemove: AbstractDialogConfig) => {
    setRenderedDialogs((configs) =>
      configs.filter((config) => config !== configToRemove),
    );
  };

  const removeAllDialogs = () => {
    setRenderedDialogs([]);
  };

  const renderDialog = useCallback(
    (config: AbstractDialogConfig) => {
      setRenderedDialogs((configs) => [...configs, config]);
    },
    [setRenderedDialogs],
  );

  const renderDialogFromConfig = (
    config: AbstractDialogConfig,
    configIndex: number,
  ) => {
    const { component: Component, props, onClose, title } = config;
    const handleClose = () => {
      removeDialog(config);
      if (onClose != null) {
        onClose();
      }
    };

    return (
      <DialogContainer
        key={configIndex}
        onCloseClick={handleClose}
        title={title}
      >
        <Component {...props} />
      </DialogContainer>
    );
  };

  const contextValue = useMemo(
    () => ({
      renderDialog,
    }),
    [renderDialog],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {renderedDialogs.length > 0 &&
        createPortal(
          <div className={styles.container}>
            <div className={styles.backdrop} onClick={removeAllDialogs} />
            {renderedDialogs.map((config, i) =>
              renderDialogFromConfig(config, i),
            )}
          </div>,
          document.body,
        )}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
