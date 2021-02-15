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
  numCardsDisplayed: number;
}

const Wrapper: React.FC<WrapperProps> = ({ numCards, numCardsDisplayed }) => {
  return (
    <div
      style={{
        border: '1px var(--color-divider) solid',
        fontFamily: 'var(--font-sans)',
        width: 400,
      }}
    >
      <HScroll numCardsDisplayed={numCardsDisplayed}>
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
  numCards: 8,
  numCardsDisplayed: 2,
};
