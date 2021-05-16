import React from 'react';

import KeyboardNavigableList from '../keyboardNavigableList/KeyboardNavigableList';
import styles from './DropdownMenu.module.css';
import { useDropdownMenuContext } from './DropdownMenuContext';

interface Props {
  children: React.ReactElement[];
}

function DropdownMenu({ children }: Props) {
  const context = useDropdownMenuContext();

  return (
    <div className={styles.container}>
      <ul
        aria-labelledby={context.triggerID}
        className={styles.list}
        id={context.menuID}
      >
        <KeyboardNavigableList direction="vertical" shouldFocusOnMount={true}>
          {children}
        </KeyboardNavigableList>
      </ul>
    </div>
  );
}

export default DropdownMenu;
