import React, { useCallback, useMemo, useState } from 'react';

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

const incrementTabIndex = (
  activeTabIndex: number,
  setActiveTabIndex: (index: number) => void,
  numTabs: number,
) => (increment: number) => {
  const newIndex = activeTabIndex + increment;
  if (newIndex < 0) {
    setActiveTabIndex(numTabs - 1);
  } else if (newIndex >= numTabs) {
    setActiveTabIndex(0);
  } else {
    setActiveTabIndex(newIndex);
  }
};

const Tabs: React.FC<Props> = ({ children, name }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const numTabs = children.reduce(
    (count: number, child: Child) =>
      count + (child.type.displayName === 'TabPanel' ? 1 : 0),
    0,
  );
  const incrementTabIndexFn = useCallback(
    incrementTabIndex(activeTabIndex, setActiveTabIndex, numTabs),
    [activeTabIndex, setActiveTabIndex, numTabs],
  );
  const contextValue = useMemo(
    () => ({
      activeTabIndex,
      incrementTabIndex: incrementTabIndexFn,
      setActiveTabIndex,
      tabsName: name,
    }),
    [activeTabIndex, incrementTabIndexFn, setActiveTabIndex, name],
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
