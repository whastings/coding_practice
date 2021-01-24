import React, { useContext } from 'react';

import TabsContext from './TabsContext';
import styles from './TabPanel.module.css';

interface Props {
  children: React.ReactNode,
  index?: number,
}

const TabPanel: React.FC<Props> = ({ children, index }) => {
  const { activeTabIndex, tabsName } = useContext(TabsContext);
  const isActive = activeTabIndex === index;

  if (index == null) {
    throw new Error('Index must be provided');
  }

  const id = `${tabsName}-${index}-panel`;
  const tabId = `${tabsName}-${index}-tab`;

  return (
    <div id={id} role="tabpanel" hidden={!isActive} className={styles.container} aria-labelledby={tabId}>
      {isActive && children}
    </div>
  );
};

// For some reason the displayName is undefined in tests
TabPanel.displayName = 'TabPanel';

export type TabPanelType = typeof TabPanel;
export default TabPanel;
