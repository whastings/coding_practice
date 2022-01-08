import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useContainerQueryStyles from './useContainerQueryStyles';

export default {
  title: 'Utils/useContainerQueryStyles',
} as Meta;

export function Default() {
  const styles = useContainerQueryStyles([
    { value: 200, width: 100 },
    { value: 300, width: 200 },
    { value: 400, width: 300 },
  ]);

  return (
    <div
      style={{
        border: '1px #000 solid',
        boxSizing: 'border-box',
        height: 50,
        maxWidth: 500,
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

export function List() {
  const listItemWidth = 50;
  const numListItems = 10;

  function ListItem({ index }: { index: number }) {
    const styles = useContainerQueryStyles(
      [{ value: listItemWidth * (index + 1), width: 0 }],
      { maxWidth: listItemWidth },
    );

    return (
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${1 - 0.05 * (index + 1)})`,
          boxSizing: 'border-box',
          flexGrow: 0,
          flexShrink: 0,
          height: listItemWidth,
          ...styles,
        }}
      />
    );
  }

  const listItems = Array.from(new Array(numListItems)).map((_, i) => (
    <ListItem index={i} key={i} />
  ));

  return <div style={{ display: 'flex' }}>{listItems}</div>;
}
