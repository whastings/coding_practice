import React, { useState } from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CenterView from '../CenterView';
import Tabs from './Tabs';

storiesOf('Components/Tabs', module).add('Default', () => {
  function Default() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const tabs = [
      { content: () => <Text>Content A</Text>, label: 'Tab A' },
      { content: () => <Text>Content B</Text>, label: 'Tab B' },
      { content: () => <Text>Content C</Text>, label: 'Tab C' },
    ];

    return (
      <CenterView>
        <Tabs
          activeTabIndex={activeTabIndex}
          onActiveTabChange={setActiveTabIndex}
          tabs={tabs}
        />
      </CenterView>
    );
  }

  return <Default />;
});
