import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useDialog from './useDialog';

export default {
  title: 'Components/Dialog',
} as Meta;

function ExampleDialog() {
  return <div>I am a dialog</div>;
}

export function Default() {
  const { Dialog, openDialog } = useDialog(<ExampleDialog />);

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      <Dialog />
    </div>
  );
}
