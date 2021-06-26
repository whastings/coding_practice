import React from 'react';

import styles from './UnstyledButton.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function UnstyledButton({ children, ...buttonProps }: Props) {
  return (
    <button {...buttonProps} className={styles.button}>
      {children}
    </button>
  );
}

export default UnstyledButton;
