import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import useDropdownMenu from './useDropdownMenu';

export default {
  title: 'Components/DropdownMenu',
} as Meta;

function ExampleMenu() {
  return (
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
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
