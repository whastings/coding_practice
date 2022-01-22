import React from 'react';
import { storiesOf } from '@storybook/react-native';

import CenterView from '../CenterView';
import Tabs from './Tabs';

storiesOf('Components/Tabs', module).add('Default', () => {
  return (
    <CenterView>
      <Tabs />
    </CenterView>
  );
});
