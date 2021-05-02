import React from 'react';

import styles from './DropdownMenuItem.module.css';

interface Props {
  children: React.ReactChild[] | React.ReactChild;
}

const DropdownMenuItem = React.forwardRef<HTMLLIElement, Props>(
  ({ children }, ref) => {
    return (
      <li className={styles.item} ref={ref} tabIndex={-1}>
        {children}
      </li>
    );
  },
);

export default DropdownMenuItem;
