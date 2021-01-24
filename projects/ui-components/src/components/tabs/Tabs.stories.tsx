import React from 'react';

import Tabs from './Tabs';
import Tab from './Tab';
import TabsList from './TabsList';
import TabPanel from './TabPanel';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

export const Basic = () => {
  return (
    <Tabs name="basic-tabs">
      <TabsList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabsList>
      <TabPanel>
        This is the first tab
      </TabPanel>
      <TabPanel>
        This is the second tab
      </TabPanel>
      <TabPanel>
        This is the third tab
      </TabPanel>
    </Tabs>
  );
};
