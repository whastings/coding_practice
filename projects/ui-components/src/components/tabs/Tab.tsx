import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';

import styles from './Tab.module.css';
import TabsContext from './TabsContext';

interface Props {
  children: React.ReactNode;
  index?: number;
}

const Tab: React.FC<Props> = ({ children, index }) => {
  const {
    activeTabIndex,
    incrementTabIndex,
    setActiveTabIndex,
    tabsName,
  } = useContext(TabsContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasMountedRef = useRef(false);
  const isActive = activeTabIndex === index;
  const id = `${tabsName}-${index}-tab`;
  const panelId = `${tabsName}-${index}-panel`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft') {
      incrementTabIndex(-1);
    } else if (event.key === 'ArrowRight') {
      incrementTabIndex(1);
    }
  };

  useEffect(() => {
    if (hasMountedRef.current && isActive && buttonRef.current != null) {
      buttonRef.current.focus();
    }
  }, [isActive, buttonRef, hasMountedRef]);
  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  if (index == null) {
    throw new Error('Index must be provided');
  }

  return (
    <button
      id={id}
      ref={buttonRef}
      type="button"
      role="tab"
      tabIndex={isActive ? undefined : -1}
      aria-controls={panelId}
      aria-selected={isActive}
      onClick={() => setActiveTabIndex(index)}
      onKeyDown={handleKeyDown}
      className={classNames(styles.button, { [styles.buttonActive]: isActive })}
    >
      {children}
    </button>
  );
};

export type TabType = typeof Tab;
export default Tab;
