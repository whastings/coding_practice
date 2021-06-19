import React from 'react';

import FocusContainer from '../../utils/FocusContainer';
import styles from './DialogContainer.module.css';

interface Props {
  children: React.ReactChild;
  title: string;
}

function DialogContainer({ children, title }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop} />
      <div className={styles.card}>
        <FocusContainer>
          {({ initialFocusRef }) => (
            <>
              <h2 ref={initialFocusRef} tabIndex={-1}>
                {title}
              </h2>
              {children}
            </>
          )}
        </FocusContainer>
      </div>
    </div>
  );
}

export default DialogContainer;
