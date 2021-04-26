import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useDropdownMenu from './useDropdownMenu';
import DropdownMenu from './DropdownMenu';

export default {
  title: 'Components/DropdownMenu',
} as Meta;

function ExampleMenu() {
  return (
    <DropdownMenu>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </DropdownMenu>
  );
}

export function Default() {
  const { menuRenderer, toggleMenu, triggerRef } = useDropdownMenu(
    <ExampleMenu />,
  );

  return (
    <div style={{ border: '1px #000 solid', padding: 10 }}>
      <button onClick={toggleMenu} ref={triggerRef}>
        Open Menu
      </button>
      {menuRenderer}
    </div>
  );
}
