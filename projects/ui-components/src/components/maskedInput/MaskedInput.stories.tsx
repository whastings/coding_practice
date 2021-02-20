import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import MaskedInput, { InputTypes } from './MaskedInput';

export default {
  title: 'Components/MaskedInput',
  component: MaskedInput,
} as Meta;

export const Date = () => {
  return <MaskedInput id="date-input" label="Date" type={InputTypes.DATE} />;
};

export const Phone = () => {
  return (
    <MaskedInput
      id="phone-input"
      label="Phone Number"
      type={InputTypes.PHONE}
    />
  );
};
