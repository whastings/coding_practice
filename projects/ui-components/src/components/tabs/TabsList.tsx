import React from 'react';

import styles from './TabsList.module.css';
import { TabType } from './Tab';

type Child = React.ReactElement<TabType>;

interface Props {
  children: Child[];
}

const TabsList: React.FC<Props> = ({ children }: Props) => {
  let nextTabIndex = 0;
  const renderedChildren = React.Children.map(children, (child) => {
    const props = { ...child.props, index: nextTabIndex };
    nextTabIndex += 1;
    return React.cloneElement(child as Child, props);
  });

  return (
    <div role="tablist" className={styles.container} aria-label="Page Contents">
      {renderedChildren}
    </div>
  );
};

export type TabsListType = typeof TabsList;
export default TabsList;
