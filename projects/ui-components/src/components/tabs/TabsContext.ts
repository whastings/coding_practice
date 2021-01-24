import React from 'react';

interface Context {
  activeTabIndex: number,
  incrementTabIndex: (index: number) => void,
  setActiveTabIndex: (index: number) => void,
  tabsName: string,
}

const TabsContext = React.createContext<Context>({
  activeTabIndex: 0,
  incrementTabIndex: (num) => {},
  setActiveTabIndex: (num) => {},
  tabsName: 'default',
});

export default TabsContext;
