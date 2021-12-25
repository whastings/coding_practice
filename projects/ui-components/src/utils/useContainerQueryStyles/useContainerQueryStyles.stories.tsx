import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useContainerQueryStyles from './useContainerQueryStyles';

export default {
  title: 'Utils/useContainerQueryStyles',
} as Meta;

export function Default() {
  const styles = useContainerQueryStyles({ value: 300, width: 100 });

  return (
    <div
      style={{
        border: '1px #000 solid',
        boxSizing: 'border-box',
        height: 50,
        maxWidth: 400,
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#0033cc',
          height: '100%',
          ...styles,
        }}
      />
    </div>
  );
}
