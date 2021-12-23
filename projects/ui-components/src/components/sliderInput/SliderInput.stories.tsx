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
  }, [props.max, props.min]);

  return (
    <div style={{ maxWidth: 500 }}>
      <SliderInput {...props} onChange={setValue} value={value} />
      <div style={{ marginTop: 10 }}>Value: {value}</div>
    </div>
  );
};

export const SingleValue = Template.bind({});
SingleValue.args = {
  max: 10,
  min: 0,
};
