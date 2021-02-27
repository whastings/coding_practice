import React, { useEffect, useRef, useState } from 'react';

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

const getSeparator = (inputType: InputTypes): string => {
  switch (inputType) {
    case InputTypes.DATE:
      return DATE_SEPARATOR;
    case InputTypes.PHONE:
      return PHONE_SEPARATOR;
  }
};

const handleDeletedSeparator = (
  newValue: string,
  oldValue: string,
  separator: string,
): string => {
  if (newValue.length !== oldValue.length - 1) {
    return newValue;
  }

  for (let i = 0; i < oldValue.length; i++) {
    if (oldValue[i] !== separator) {
      continue;
    }

    const beforeSeparatorOldValue = oldValue.slice(0, i);
    const beforeSeparatorNewValue = newValue.slice(0, i);
    if (
      beforeSeparatorNewValue === beforeSeparatorOldValue &&
      newValue[i] !== separator
    ) {
      return newValue.slice(0, i - 1) + newValue.slice(i);
    }
  }

  return newValue;
};

const MaskedInput: React.FC<Props> = ({ id, label, type }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  useEffect(() => {
    const cursorPosition = cursorPositionRef.current;
    const input = inputRef.current;

    if (cursorPosition != null && input != null) {
      input.setSelectionRange(cursorPosition, cursorPosition);
      cursorPositionRef.current = null;
    }
  });

  const formatValue = getFormatter(type);
  const separator = getSeparator(type);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const adjustedValue = handleDeletedSeparator(newValue, value, separator);
    const charDeleted = adjustedValue !== newValue;
    const formattedValue = formatValue(adjustedValue);
    setValue(formattedValue);

    const cursorPosition = event.target.selectionStart;
    if (cursorPosition != null && cursorPosition <= newValue.length - 1) {
      cursorPositionRef.current = charDeleted
        ? cursorPosition - 1
        : cursorPosition;
    }
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={handleChange} ref={inputRef} value={value} />
    </>
  );
};

export default MaskedInput;
