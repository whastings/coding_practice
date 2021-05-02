import React, { useContext } from 'react';

import styles from './TabsList.module.css';
import { TabType } from './Tab';
import KeyboardNavigableList from '../keyboardNavigableList/KeyboardNavigableList';
import TabsContext from './TabsContext';

type Child = React.ReactElement<TabType>;

interface Props {
  children: Child[];
}

const TabsList: React.FC<Props> = ({ children }: Props) => {
  const { setActiveTabIndex } = useContext(TabsContext);

  const renderedChildren = React.Children.map(children, (child, i) => {
    const props = { ...child.props, index: i };
    return React.cloneElement(child as Child, props);
  });

  return (
    <div role="tablist" className={styles.container} aria-label="Page Contents">
      <KeyboardNavigableList
        direction="horizontal"
        onNavigate={setActiveTabIndex}
      >
        {renderedChildren}
      </KeyboardNavigableList>
    </div>
  );
};

export type TabsListType = typeof TabsList;
export default TabsList;
