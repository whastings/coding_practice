import React from 'react';
import { ReactComponent as XIcon } from 'bootstrap-icons/icons/x-lg.svg';

import FocusContainer from '../../utils/FocusContainer';
import KeyboardEventsProvider from '../../utils/keyboardEvents/KeyboardEventsProvider';
import styles from './DialogContainer.module.css';
import UnstyledButton from '../buttons/UnstyledButton';

interface Props {
  children: React.ReactChild;
  onCloseClick: () => void;
  title: string;
}

function DialogContainer({ children, onCloseClick, title }: Props) {
  return (
    <div className={styles.card}>
      <KeyboardEventsProvider>
        <FocusContainer>
          {({ initialFocusRef }) => (
            <>
              <div className={styles.header}>
                <h2
                  className={styles.heading}
                  ref={initialFocusRef}
                  tabIndex={-1}
                >
                  {title}
                </h2>
                <UnstyledButton
                  aria-label="Close dialog"
                  onClick={onCloseClick}
                >
                  <XIcon className={styles.xIcon} />
                </UnstyledButton>
              </div>
              {children}
            </>
          )}
        </FocusContainer>
      </KeyboardEventsProvider>
    </div>
  );
}

export default DialogContainer;
