import React from 'react';

interface Context {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  tabsName: string;
}

const TabsContext = React.createContext<Context>({
  activeTabIndex: 0,
  setActiveTabIndex: (num) => {},
  tabsName: 'default',
});

export default TabsContext;
