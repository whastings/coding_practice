import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import SliderInput from './SliderInput';

export default {
  title: 'Components/SliderInput',
} as Meta;

export function SingleValue() {
  return (
    <div style={{ maxWidth: 500 }}>
      <SliderInput min={0} max={10} value={5} />
    </div>
  );
}
