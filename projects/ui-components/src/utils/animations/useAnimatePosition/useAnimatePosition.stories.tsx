import React, { CSSProperties, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { KeyframesGenerator } from '../AnimationTypes';
import useAnimatePosition from './useAnimatePosition';
import useLinearKeyframesGenerator from '../useLinearKeyframesGenerator';
import useSpringKeyframesGenerator from '../useSpringKeyframesGenerator';

const ExampleStyles: { [name: string]: CSSProperties } = {
  box: {
    backgroundColor: 'red',
    height: 100,
    position: 'absolute',
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
  container: {
    height: 'calc(100vh - 32px)',
    position: 'relative',
    width: 'calc(100vw - 32px)',
  },
};

function Example({
  keyframesGenerator,
}: {
  keyframesGenerator: KeyframesGenerator;
}) {
  const [position, setPosition] = useState<number>(0);
  const boxRef = useAnimatePosition<HTMLDivElement>(position, {
    keyframesGenerator,
  });

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
      style={ExampleStyles.container}
    >
      <div
        ref={boxRef}
        style={{ ...ExampleStyles.box, ...getPositionStyle() }}
      />
    </div>
  );
}

export default {
  title: 'Utils/useAnimatePosition',
  component: Example,
} as Meta;

export function Linear() {
  const keyframesGenerator = useLinearKeyframesGenerator(2000);
  return <Example keyframesGenerator={keyframesGenerator} />;
}

export function Spring() {
  const keyframesGenerator = useSpringKeyframesGenerator({
    friction: 10,
    mass: 1,
    precision: 2,
    tension: 100,
  });
  return <Example keyframesGenerator={keyframesGenerator} />;
}
