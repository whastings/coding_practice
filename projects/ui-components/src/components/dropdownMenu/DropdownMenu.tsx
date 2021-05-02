import React from 'react';

import KeyboardNavigableList from '../keyboardNavigableList/KeyboardNavigableList';
import styles from './DropdownMenu.module.css';

interface Props {
  children: React.ReactElement[];
}

function DropdownMenu({ children }: Props) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <KeyboardNavigableList direction="vertical" shouldFocusOnMount={true}>
          {children}
        </KeyboardNavigableList>
      </ul>
    </div>
  );
}

export default DropdownMenu;
