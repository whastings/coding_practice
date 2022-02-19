import React, { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import DialogContext, { ContextType } from './DialogContext';

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  wrapper: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
});

function DialogProvider({ children }: Props) {
  const [DialogComponent, setDialogComponent] =
    useState<React.ComponentType | null>(null);

  const removeDialog = () => setDialogComponent(null);

  const contextValue: ContextType = useMemo(
    () => ({
      renderDialog: (component) => setDialogComponent(() => component),
    }),
    [],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {DialogComponent != null && (
        <Modal onRequestClose={removeDialog} transparent={true} visible={true}>
          <View style={styles.wrapper}>
            <Pressable
              onPress={removeDialog}
              style={[styles.backdrop, StyleSheet.absoluteFill]}
            />
            <DialogComponent />
          </View>
        </Modal>
      )}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
