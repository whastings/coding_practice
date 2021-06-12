import React from 'react';

import styles from './DialogContainer.module.css';

interface Props {
  children: React.ReactChild;
}

function DialogContainer({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}

export default DialogContainer;
