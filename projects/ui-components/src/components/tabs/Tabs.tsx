import React, { useMemo, useState } from 'react';

import { TabsListType } from './TabsList';
import { TabPanelType } from './TabPanel';
import styles from './Tabs.module.css';
import TabsContext from './TabsContext';

type Child =
  | React.ReactComponentElement<TabsListType>
  | React.ReactComponentElement<TabPanelType>;

interface Props {
  children: Child[];
  name: string;
}

const renderChildren = (children: Child[]) => {
  let nextTabPanelIndex = 0;
  return React.Children.map(children, (child) => {
    if (child.type.displayName === 'TabPanel') {
      const props = { index: nextTabPanelIndex };
      nextTabPanelIndex += 1;
      return React.cloneElement(
        child as React.ReactComponentElement<TabPanelType>,
        props,
      );
    }
    return child;
  });
};

const Tabs: React.FC<Props> = ({ children, name }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const contextValue = useMemo(
    () => ({
      activeTabIndex,
      setActiveTabIndex,
      tabsName: name,
    }),
    [activeTabIndex, setActiveTabIndex, name],
  );

  return (
    <div className={styles.container}>
      <TabsContext.Provider value={contextValue}>
        {renderChildren(children)}
      </TabsContext.Provider>
    </div>
  );
};

export default Tabs;
