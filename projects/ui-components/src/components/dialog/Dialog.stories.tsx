import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useDialog from './useDialog';

export default {
  title: 'Components/Dialog',
} as Meta;

function ExampleDialog() {
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
    </div>
  );
}

export function Default() {
  const { Dialog, openDialog } = useDialog(<ExampleDialog />, {
    title: 'Example Dialog',
  });

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      <Dialog />
    </div>
  );
}
