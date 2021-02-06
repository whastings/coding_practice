import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import HScroll from './HScroll';
import HScrollCard from './HScrollCard';

export default {
  title: 'Components/HScroll',
  component: HScroll,
} as Meta;

export const Basic = () => {
  return (
    <div
      style={{
        width: 400,
      }}
    >
      <HScroll>
        <HScrollCard>1</HScrollCard>
        <HScrollCard>2</HScrollCard>
        <HScrollCard>3</HScrollCard>
        <HScrollCard>4</HScrollCard>
        <HScrollCard>5</HScrollCard>
        <HScrollCard>6</HScrollCard>
      </HScroll>
    </div>
  );
};
