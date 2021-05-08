import React, { useContext } from 'react';
import classNames from 'classnames';

import styles from './Tab.module.css';
import TabsContext from './TabsContext';

interface Props {
  children: React.ReactNode;
  index?: number;
}

const Tab = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, index }, ref) => {
    const { activeTabIndex, setActiveTabIndex, tabsName } = useContext(
      TabsContext,
    );
    const isActive = activeTabIndex === index;
    const id = `${tabsName}-${index}-tab`;
    const panelId = `${tabsName}-${index}-panel`;

    if (index == null) {
      throw new Error('Index must be provided');
    }

    return (
      <button
        id={id}
        ref={ref}
        type="button"
        role="tab"
        tabIndex={isActive ? undefined : -1}
        aria-controls={panelId}
        aria-selected={isActive}
        onClick={() => setActiveTabIndex(index)}
        className={classNames(styles.button, {
          [styles.buttonActive]: isActive,
        })}
      >
        {children}
      </button>
    );
  },
);

export type TabType = typeof Tab;
export default Tab;
