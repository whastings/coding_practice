import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useDropdownMenu from './useDropdownMenu';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

export default {
  title: 'Components/DropdownMenu',
} as Meta;

function ExampleMenu() {
  const handleItemClick = (index: number) => {
    window.alert(`Item #${index + 1} activated`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuItem onActivate={() => handleItemClick(0)}>
        Item 1
      </DropdownMenuItem>
      <DropdownMenuItem onActivate={() => handleItemClick(1)}>
        Item 2
      </DropdownMenuItem>
      <DropdownMenuItem onActivate={() => handleItemClick(2)}>
        Item 3
      </DropdownMenuItem>
    </DropdownMenu>
  );
}

export function Default() {
  const {
    menuRenderer,
    toggleMenu,
    triggerProps,
    triggerRef,
  } = useDropdownMenu(<ExampleMenu />);

  return (
    <div style={{ border: '1px #000 solid', padding: 10 }}>
      <button {...triggerProps} onClick={toggleMenu} ref={triggerRef}>
        Open Menu
      </button>
      {menuRenderer}
    </div>
  );
}

export function Flipped() {
  const {
    menuRenderer,
    toggleMenu,
    triggerProps,
    triggerRef,
  } = useDropdownMenu(<ExampleMenu />);

  return (
    <div
      style={{
        alignItems: 'flex-start',
        border: '1px #000 solid',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'flex-end',
        padding: 10,
      }}
    >
      <button {...triggerProps} onClick={toggleMenu} ref={triggerRef}>
        Open Menu
      </button>
      {menuRenderer}
    </div>
  );
}
