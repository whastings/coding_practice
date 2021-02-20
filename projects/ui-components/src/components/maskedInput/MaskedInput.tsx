import React, { useState } from 'react';

export enum InputTypes {
  DATE,
  PHONE,
}

interface Props {
  id: string;
  label: string;
  type: InputTypes;
}

type Formatter = (value: string) => string;

const DATE_OFFSETS = [4, 7];
const DATE_SEPARATOR = '/';

const PHONE_OFFSETS = [3, 7];
const PHONE_SEPARATOR = '-';

const addSeparators = (
  value: string,
  separator: string,
  offsets: Array<number>,
): string => {
  return offsets.reduce((currentValue, offset) => {
    if (currentValue.length >= offset) {
      const beginning = currentValue.slice(0, offset);
      const end = currentValue.slice(offset);
      return beginning + separator + end;
    }
    return currentValue;
  }, value);
};

const formatDate: Formatter = (value) => {
  const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 8);
  return addSeparators(sanitizedValue, DATE_SEPARATOR, DATE_OFFSETS);
};

const formatPhone: Formatter = (value) => {
  const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
  return addSeparators(sanitizedValue, PHONE_SEPARATOR, PHONE_OFFSETS);
};

const getFormatter = (inputType: InputTypes): Formatter => {
  switch (inputType) {
    case InputTypes.DATE:
      return formatDate;
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
