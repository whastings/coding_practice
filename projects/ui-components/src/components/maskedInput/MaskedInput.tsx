import React, { useState } from 'react';

export enum InputTypes {
  PHONE,
}

interface Props {
  id: string;
  label: string;
  type: InputTypes;
}

type Formatter = (value: string) => string;

const PHONE_OFFSETS = [3, 7];
const PHONE_SEPARATOR = '-';

const formatPhone: Formatter = (value) => {
  const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);

  const formattedValue = PHONE_OFFSETS.reduce((currentValue, offset) => {
    if (currentValue.length >= offset) {
      const beginning = currentValue.slice(0, offset);
      const end = currentValue.slice(offset);
      return beginning + PHONE_SEPARATOR + end;
    }
    return currentValue;
  }, sanitizedValue);

  return formattedValue;
};

const getFormatter = (inputType: InputTypes): Formatter => {
  switch (inputType) {
    case InputTypes.PHONE:
      return formatPhone;
  }
};

const MaskedInput: React.FC<Props> = ({ id, label, type }) => {
  const [value, setValue] = useState('');

  const formatValue = getFormatter(type);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const formattedValue = formatValue(newValue);
    setValue(formattedValue);
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={handleChange} value={value} />
    </>
  );
};

export default MaskedInput;
