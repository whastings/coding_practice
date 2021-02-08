import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import HScroll from './HScroll';
import HScrollCard from './HScrollCard';

export default {
  title: 'Components/HScroll',
  component: HScroll,
} as Meta;

interface WrapperProps {
  numCards: number;
}

const Wrapper: React.FC<WrapperProps> = ({ numCards }) => {
  return (
    <div
      style={{
        width: 400,
      }}
    >
      <HScroll>
        {Array.from(new Array(numCards)).map((_, i) => (
          <HScrollCard key={i}>{i + 1}</HScrollCard>
        ))}
      </HScroll>
    </div>
  );
};

const Template: Story<WrapperProps> = (args) => <Wrapper {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  numCards: 6,
};
