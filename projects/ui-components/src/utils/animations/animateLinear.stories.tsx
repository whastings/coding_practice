import React, { useEffect, useRef, useReducer } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import animateLinear, { Options } from './animateLinear';

const styles = {
  backgroundColor: '#0033cc',
  height: 200,
  width: 200,
};

const countReducer = (state: number) => state + 1;

function Wrapper(props: Options) {
  const divRef = useRef<HTMLDivElement>(null);
  const [count, increment] = useReducer(countReducer, 0);

  useEffect(() => {
    animateLinear(divRef.current, props);
  }, [count]);

  return (
    <div key={count} onClick={increment} ref={divRef} style={styles} />
  );
}

export default {
  title: 'Utils/animateLinear',
  component: Wrapper,
} as Meta;

const Template: Story<Options> = (args) => <Wrapper {...args} />;

export const Distance = Template.bind({});
Distance.args = {
  distancePx: 300,
  durationMs: 1000,
};
