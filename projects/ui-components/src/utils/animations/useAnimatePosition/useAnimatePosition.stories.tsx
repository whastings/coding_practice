import React, { CSSProperties, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import useAnimatePosition from './useAnimatePosition';

const ExampleStyles: { [name: string]: CSSProperties } = {
  box: {
    backgroundColor: 'red',
    height: 100,
    position: 'fixed',
    width: 100,
  },
  boxPosition1: {
    left: 10,
    top: 10,
  },
  boxPosition2: {
    right: 10,
    top: 10,
  },
  boxPosition3: {
    bottom: 10,
    right: 10,
  },
  boxPosition4: {
    bottom: 10,
    left: 10,
  },
};

function Example() {
  const [position, setPosition] = useState<number>(0);
  const boxRef = useAnimatePosition<HTMLDivElement>(position);

  const getPositionStyle = () => {
    switch (position) {
      case 0:
        return ExampleStyles.boxPosition1;
      case 1:
        return ExampleStyles.boxPosition2;
      case 2:
        return ExampleStyles.boxPosition3;
      case 3:
        return ExampleStyles.boxPosition4;
    }
  };

  return (
    <div
      onClick={() => setPosition((position + 1) % 4)}
      ref={boxRef}
      style={{ ...ExampleStyles.box, ...getPositionStyle() }}
    />
  );
}

export default {
  title: 'Utils/useAnimatePosition',
  component: Example,
} as Meta;

export function Default() {
  return <Example />;
}
