import React from 'react';

import styles from './DropdownMenu.module.css';

interface Props {
  children: React.ReactChild[] | React.ReactChild;
}

function DropdownMenu({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}

export default DropdownMenu;
