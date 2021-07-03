import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import DialogProvider from './DialogProvider';
import useDialog from './useDialog';

export default {
  decorators: [
    (Story) => (
      <DialogProvider>
        <Story />
      </DialogProvider>
    ),
  ],
  title: 'Components/Dialog',
} as Meta;

function SmallDialog({ text }: { text: string }) {
  return <div>{text}</div>;
}

function ExampleDialog() {
  const { openDialog, triggerRef } = useDialog();
  const openSmallDialog = () => {
    openDialog({
      component: SmallDialog,
      props: { text: 'Another dialog' },
      title: 'Small Dialog',
    });
  };

  return (
    <div>
      I am a dialog
      <div>
        <button>Button 1</button>
      </div>
      <div>
        <button>Button 2</button>
      </div>
      <div tabIndex={0}>Tabbable</div>
      <div tabIndex={-1}>Not Tabbable</div>
      <div>
        <a href="#foo">Tabbable Link</a>
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Not Tabbable Link</a>
      </div>
      <button onClick={openSmallDialog} ref={triggerRef}>
        Dialog-ception!
      </button>
    </div>
  );
}

export function Default() {
  const { openDialog, triggerRef } = useDialog();

  const handleClick = () => {
    openDialog({
      component: ExampleDialog,
      props: {},
      title: 'Example Dialog',
    });
  };

  return (
    <div>
      <button onClick={handleClick} ref={triggerRef}>
        Open Dialog
      </button>
    </div>
  );
}
