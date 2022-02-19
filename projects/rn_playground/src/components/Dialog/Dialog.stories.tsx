import React from 'react';

import { storiesOf } from '@storybook/react-native';

import CenterView from '../CenterView';
import { Button, Text } from 'react-native';
import useDialog from './useDialog';
import DialogProvider from './DialogProvider';
import Dialog from './Dialog';

function ExampleDialog() {
  return (
    <Dialog>
      <Text>Test</Text>
    </Dialog>
  );
}

storiesOf('Components/Dialog', module).add('Default', () => {
  function Default() {
    const openDialog = useDialog(ExampleDialog);

    return (
      <CenterView>
        <Button onPress={openDialog} title="Open Dialog" />
      </CenterView>
    );
  }

  return (
    <DialogProvider>
      <Default />
    </DialogProvider>
  );
});
