import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import SliderInput, { Props as SliderInputProps } from './SliderInput';

export default {
  title: 'Components/SliderInput',
  component: SliderInput,
} as Meta;

const Template: Story<SliderInputProps> = (props) => {
  const [value, setValue] = useState(props.min);

  useEffect(() => {
    setValue(props.min);
  }, [props.max, props.min, props.step]);

  const printedValue = (
    <div style={{ marginBottom: 10, marginTop: 10 }}>Value: {value}</div>
  );

  return (
    <div
      style={{
        height: props.vertical ? '100vh' : 'auto',
        maxHeight: props.vertical ? 500 : 100,
        maxWidth: props.vertical ? 100 : 500,
      }}
    >
      {props.vertical && printedValue}
      <SliderInput {...props} onChange={setValue} value={value} />
      {!props.vertical && printedValue}
    </div>
  );
};

export const SingleValue = Template.bind({});
SingleValue.args = {
  max: 10,
  min: 0,
  step: 1,
};

export const Vertical = Template.bind({});
Vertical.args = {
  max: 10,
  min: 0,
  step: 1,
  vertical: true,
};
