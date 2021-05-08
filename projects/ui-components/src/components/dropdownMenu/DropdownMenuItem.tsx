import React from 'react';

import { useDropdownMenuContext } from './DropdownMenuContext';
import styles from './DropdownMenuItem.module.css';

interface Props {
  children: React.ReactChild[] | React.ReactChild;
  onActivate: () => void;
}

const DropdownMenuItem = React.forwardRef<HTMLLIElement, Props>(
  ({ children, onActivate }, ref) => {
    const context = useDropdownMenuContext();

    const handleActivate = () => {
      onActivate();
      context.onItemActivate();
    };

    return (
      <li
        className={styles.item}
        onClick={handleActivate}
        ref={ref}
        tabIndex={-1}
      >
        {children}
      </li>
    );
  },
);

export default DropdownMenuItem;
